---
name: tech-spec
description: 'legacy-spec, schema, domain-spec을 기반으로 도메인의 activity, 컴포넌트, fragment, 상태와 핸들러를 설계해요. migration [4] 단계예요.'
argument-hint: '<도메인명>'
---

# Tech Spec

## Phase 1: 입력 수집

- `.claude/references/architecture.md` (필수)
- `.claude/__generated__/migration/{domain}/legacy-spec.md` (필수)
- 같은 폴더의 `schema.md`, `domain-spec.md` (있으면)
- `apps/webview/schema.graphql`
- `.claude/references/lessons-learned.md`에서 `relay`, `stackflow`, `migration` 태그

## Phase 2: 현재 코드 확인

추측으로 쓰지 않아요. 실제 파일을 읽고 재사용할 것을 찾아요.

- `apps/webview/src/routes/`, `src/stackflow/`: 등록된 activity와 params
- `src/components/common/`, `src/components/shared/`: 재사용할 컴포넌트
- `src/styles/tokens.stylex.ts`: 쓸 수 있는 토큰
- `src/relay/`: mock network 구성
- `src/pages/`: 비슷한 페이지의 구조

## Phase 3: 설계

### 3-1. Activity

| activity | route | params | step | 레거시 화면 |
| -------- | ----- | ------ | ---- | ----------- |

- 바텀시트는 activity로 만들지 않고, 페이지별로 어떤 시트가 있는지와 `useStepFlowModalState`의 modalId를 적어요 (architecture.md 라우팅)

### 3-2. 컴포넌트 트리와 분류

- 페이지별 트리 (pages / common / shared 표시)
- 새로 만드는 common·shared 컴포넌트와 그 이유

### 3-3. 데이터

- 페이지 query (이름, 변수, fetchPolicy). `network-only`는 쓰지 않아요 (architecture.md Relay)
- 컴포넌트별 fragment (이름, 필드)
- connection key와 페이지네이션
- mutation별: 호출 위치, `error.__typename` 분기와 각 케이스의 UI, connection 갱신 방법 (Edge / deletedId / 자동)
- mock network에 필요한 데이터 (mock resolver, 고정 값)

### 3-4. 상태와 핸들러

기능 단위로 표를 만들어요.

| 상태 | 종류 | 용도 | 초기화 시점 |
| ---- | ---- | ---- | ----------- |

| 핸들러 | 역할 | 쓰는 상태 | 쓰는 domain 함수 |
| ------ | ---- | --------- | ---------------- |

- 서버 데이터(Relay)는 상태로 두지 않아요
- 전역 상태가 필요해 보이면 근거를 적고 사용자에게 확인받아요

### 3-5. UI 분기

컴포넌트마다 조건 → 보이는 UI를 빠짐없이 적어요. 로딩(Suspense fallback), 빈 목록, 에러, 권한 없음, domain 함수의 모든 케이스를 포함해요.

### 3-6. 스타일 토큰

필요한데 아직 없는 토큰을 적어요. 레거시 색상·폰트를 참고하되 값을 그대로 쓰지 않고 토큰으로 정의해요.

### 3-7. 체크리스트

legacy-spec의 화면과 규칙(R 번호)마다 확인할 동작을 적어요. verify가 이 목록을 그대로 확인해요.

## Phase 4: 확인

activity 표와 컴포넌트 트리를 보여주고 AskUserQuestion으로 확인받아요.

## 산출물

`.claude/__generated__/migration/{domain}/tech-spec.md`에 3-1 ~ 3-7을 같은 순서로 저장해요.

저장 후 한 줄만 반환해요.

```
✅ tech-spec.md 저장 (activity {N}, 컴포넌트 {N}, 체크 {N}건) → .claude/__generated__/migration/{domain}/tech-spec.md
```

## 분석 시작

$ARGUMENTS
