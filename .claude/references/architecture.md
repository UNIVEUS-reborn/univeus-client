# univeus-client 아키텍처

마이그레이션 스킬 전체가 이 문서를 기준으로 작업해요. 원칙을 바꿀 때는 이 파일만 고쳐요.

## 앱 구성

| 앱             | 역할                | 기술                                                    |
| -------------- | ------------------- | ------------------------------------------------------- |
| `apps/webview` | 실제 화면           | React 19, Vite 8, Stackflow 2, StyleX, Relay 21, vitest |
| `apps/shell`   | 웹뷰를 띄우는 앱 쉘 | Expo, react-native-webview                              |

- 패키지 매니저는 bun, 태스크 러너는 turbo예요
- 레포 `.npmrc`가 공개 npm registry를 지정해요. 전역 registry·프록시 설정보다 우선해요

## 폴더 구조 (`apps/webview/src`)

```
routes/        activityNames.ts, activityParams.ts, routes.ts
stackflow/     config.ts, register.ts, stackflow.tsx, useFlow.ts, useStepFlow.ts
relay/         environment.ts, mock network
pages/{pageName}/
  {PageName}Page.tsx
  {SubComponent}.tsx
  steps/           step이 있는 activity의 단계 컴포넌트
  hooks/use{Feature}.ts
  domain/
    {feature}.ts          순수 함수
    {feature}.test.ts     필수
    {feature}.relay.ts    readInlineData 어댑터 (테스트 면제)
    {feature}Fixtures.ts  객체 입력 테스트용
components/
  common/{Entity}/   여러 페이지에서 재사용 + 도메인 데이터(fragment) 있음
  shared/            재사용 + 순수 UI
styles/tokens.stylex.ts
utils/         비즈니스 의미 없는 포맷·변환
__generated__/ Relay 생성 파일 (수정 금지, 커밋함)
```

- 페이지 폴더 이름은 `page{Name}` (예: `pageGroupDetail`)
- 컴포넌트는 `PascalCase.tsx`, 훅·유틸은 `camelCase.ts`

## import 방향

- `pages` → `common`, `shared` 가능
- `common` → 다른 `common`, `shared` 가능. `pages` import 금지
- `shared` → 다른 레이어 import 금지
- `domain/` → 다른 `domain/`, 타입만 가능. React, Stackflow, StyleX, DOM, Relay hooks 금지 (`*.relay.ts`의 `readInlineData`만 예외)

## domain 규칙

- 순수 함수만 둬요. 비즈니스 의사결정(언제, 누가, 어떤 조건에서)만 domain이고, 포맷·단순 산술은 `utils/`
- `domain/*.ts`마다 `*.test.ts`가 있어야 해요
- 입력 타입은 domain 파일 안에 직접 선언해요. Relay 생성 타입(`$data`)에 직접 의존하지 않고, `*.relay.ts`가 변환해서 넘겨요
- `*.relay.ts`는 fragment 인라인 선언 + `readInlineData` + 변환만 해요. read 함수는 하나만 export하고 이름은 `read*`
- 판별 결과는 boolean이 아니라 이유가 담긴 discriminated union이에요
- 판단할 수 없는 값(null, Relay의 `'%future added value'`)은 기본값을 차단(BLOCKED, UNKNOWN)으로 둬요
- 사용자에게 보여줄 문구를 반환하지 않아요. 케이스만 반환하고 문구는 컴포넌트의 exhaustive switch가 정해요
- `?? 0` 같은 암묵적 기본값으로 빠진 데이터를 숨기지 않아요
- 에러를 다이얼로그·토스트로 바꾸는 건 hook이 해요. domain은 순수하게 유지해요

### export 함수 동사

| 동사         | 반환                                                 |
| ------------ | ---------------------------------------------------- |
| `classify`   | 케이스 union                                         |
| `can`        | `{ type: 'ALLOWED' } \| { type: 'BLOCKED'; reason }` |
| `resolve`    | 값 하나 또는 정책 객체 (union이면 classify)          |
| `calculate`  | 숫자                                                 |
| `build`      | mutation input, 폼 값 조립                           |
| `to`         | 형태 변환                                            |
| `is` / `has` | boolean                                              |
| `validate`   | `{ type: 'VALID' } \| { type: 'INVALID'; reason }`   |

금지: `get`, `check`, `should`, `format`(→ utils), `count`/`sum`(→ calculate)

예: `classifyGroupAction`, `canJoinGroup`, `calculateRemainingSeats`, `buildCreateGroupInput`, `validateNickname`

## 라우팅 (Stackflow 2)

- activity 이름은 `routes/activityNames.ts`의 상수로만 써요
- params 타입은 `routes/activityParams.ts`에 두고 `stackflow/register.ts`에서 `@stackflow/config`의 `Register`를 확장해요
- 화면 이동은 `@src/stackflow/useFlow`(push, replace, pop)와 `@src/stackflow/useStepFlow(activityName)`(pushStep, replaceStep, popStep)로만 해요. `@stackflow/react`의 같은 이름 훅은 oxlint가 막아요
- `useStepFlow`는 호출한 activity를 `targetActivityId`로 고정해요. 화면 전환 중에 step을 부르면 새 activity에 step이 들어가는 문제를 막아요
- params에는 ID만 넘겨요. 큰 데이터를 넘기지 않아요
- 여러 단계 화면(가입, 모임 작성)은 activity 하나 + step으로 만들어요
- 하단 탭은 `Main` activity 하나 안에서 전환해요
- 바텀시트는 activity로 만들지 않아요. 페이지 안에서 `shared/BottomSheet`를 렌더하고, 열림 상태는 `useStepFlowModalState(activityName, modalId)`로 step params에 둬요. 뒤로가기를 누르면 시트만 닫혀요
- 시트에서 다음 시트로 넘길 때는 `await close()` 뒤에 `open()`해요

## Relay

- 컴포넌트가 쓰는 데이터는 그 컴포넌트의 fragment로 선언해요 (`{ComponentName}_{type}`)
- connection key는 `{ComponentName}_{parentType}_{fieldName}`
- mutation 결과는 Result 래퍼예요. `error.__typename`으로 분기하고, 성공 피드백은 `onCompleted`에서 결과를 확인한 뒤에만 보여줘요
- 목록에 추가는 Edge, 삭제는 `deletedId`로 connection을 갱신해요
- optimisticResponse에 fragment 데이터를 spread하지 않아요
- 페이지마다 Suspense 경계를 둬요
- `fetchPolicy: 'network-only'`는 쓰지 않아요. React 19 StrictMode가 Suspense 내용이 다시 보일 때 effect를 다시 실행하고, Relay가 그때마다 새로 요청하면서 무한 요청이 생겨요 (facebook/react#30799). 최신 값이 필요하면 `store-and-network`를 써요
- 버튼을 눌러 한 번 묻는 조회는 `fetchQuery`를 써요. 기본값이 `network-only`라 fetchPolicy를 넘기지 않아요
- graphql 태그를 수정하면 바로 `bun run relay`를 실행하고, 필드·enum은 `schema.graphql`에서 확인해요
- 서버가 없는 동안은 mock network가 `schema.graphql` 기준으로 응답해요

## 스타일 (StyleX)

- 색상, 간격, 글자 크기는 `styles/tokens.stylex.ts` 토큰만 써요. 값을 직접 쓰지 않아요 (이미지 크기 px는 허용)
- `stylex.create`는 컴포넌트와 같은 파일 하단에 둬요

## 코드 작성

- 코드와 설정 파일에 주석을 달지 않아요. 설명은 대화로 해요
- 타입 단언(`as Type`, `<Type>x`)을 쓰지 않아요. oxlint가 막아요. 필요하면 타입 가드나 `satisfies`를 써요 (`as const`는 허용)
- 타이머를 쓰는 `useEffect`는 cleanup을 반환해요
- 로딩 상태를 쓰는 async 핸들러는 try / catch / finally로 작성해요
- 필터를 바꾸면 페이지네이션을 처음부터 다시 시작해요
- 상태와 핸들러는 컴포넌트 안에 두는 게 기본이에요. 로직이 복잡할 때만 같은 폴더에 훅으로 분리해요
- 전역 상태 라이브러리는 아직 쓰지 않아요. 화면을 넘어 공유해야 하는 클라이언트 상태가 생기면 그때 정해요

## 테스트

- 관찰 가능한 동작(입력 → 출력)만 검증해요. 내부 호출은 검증하지 않아요
- domain은 순수 함수라 mock을 쓰지 않아요
- 테스트 케이스 설명은 ~요체로 써요 (`it('정원이 차면 참여할 수 없어요', ...)`)

## 검증 명령

루트에서 실행해요.

```bash
(cd apps/webview && bun run relay)
bun run check-types
bunx turbo run lint --filter=webview
bun run test
bun run build
```

## 커밋

- 커밋은 사용자가 직접 해요. 스킬은 메시지만 추천해요
- 형식: `feat(webview): 한글 요약`
- 도메인마다 schema 커밋과 화면 커밋을 나눠요
