---
name: schema-review
description: 'apps/webview/schema.graphql에서 도메인이 추가·변경한 부분을 univeus 컨벤션과 Relay 클라이언트 관점으로 리뷰해요. migration [2.5] 단계예요.'
argument-hint: '<도메인명>'
---

# 스키마 리뷰

## Phase 1: 입력 수집

- `.claude/skills/schema-design/references/conventions.md` (필수)
- `.claude/__generated__/migration/{domain}/schema.md` (리뷰 대상과 설계 근거)
- `.claude/__generated__/migration/{domain}/legacy-spec.md` (요구사항 누락 확인용)
- `apps/webview/schema.graphql` (기존 타입과의 일관성 확인용)

## Phase 2: 체크리스트

이 도메인이 추가·변경한 부분만 리뷰해요.

### 컨벤션

- [ ] 엔티티가 `Node`를 구현하고, URL로 조회하는 엔티티만 `_id`를 가짐
- [ ] ID 인자: URL 단건 조회는 `_id`, Mutation Input은 global `id`, 주석에 명시
- [ ] Connection: `edges`, `pageInfo`, Edge의 `node`·`cursor`. `totalCount`는 개수를 보여주는 화면이 있을 때만
- [ ] Mutation: `input` 하나, Result 래퍼, `Error{Action}{Entity}` union 끝에 `UnexpectedError`
- [ ] 에러 타입 이름은 `{Reason}Error` (예: `NotFoundGroupError`)
- [ ] 에러 타입마다 `message: String!`, 클라이언트 분기에 필요한 정보는 필드로
- [ ] 입력칸 에러 표시가 필요하면 enum 필드
- [ ] 리스트와 요소 non-null, ID는 `ID` 타입, enum 값마다 한글 주석
- [ ] 타입·enum·Input·에러 타입마다 한글 주석

### Relay 클라이언트

- [ ] 생성은 Edge, 수정·상태 변경은 엔티티(`id` 포함), 삭제는 `deletedId` 반환
- [ ] 전체 값을 다시 보내는 수정 Input이면 조회 타입에 그 값을 다시 만들 수 있는 필드(id 포함)가 있음
- [ ] 화면에 필요한 필드가 fragment로 한 번에 모일 수 있게 엔티티에 있음

### 요구사항

- [ ] legacy-spec의 화면이 쓰는 데이터 필드가 모두 있음
- [ ] legacy-spec의 사용자 행동마다 Query 또는 Mutation이 있음
- [ ] legacy-spec의 실패 상황(검증 실패, 권한 없음, 용량 초과 등)마다 에러 타입이 있음
- [ ] 서버가 판단해야 하는 규칙(시간 기준, 권한, 집계)이 서버 필드로 있음

### Nullability

- [ ] non-null 필드가 실제로 항상 존재함 (탈퇴, 삭제, 비로그인 상황 포함)
- [ ] nullable 필드는 schema.md에 이유가 있음

### 금지 패턴

- [ ] Boolean·값을 직접 반환하는 Mutation 없음
- [ ] 인자를 나열한 Mutation 없음

## Phase 3: 분류

| 분류          | 기준                               |
| ------------- | ---------------------------------- |
| 결함          | 화면이나 흐름이 동작하지 않음      |
| 요구사항 누락 | legacy-spec에 있는데 스키마에 없음 |
| 컨벤션        | 규칙 위반, 동작에는 영향 없음      |
| 확인 필요     | 서버 정책을 정해야 판단할 수 있음  |

## 산출물

`.claude/__generated__/migration/{domain}/schema-review.md`

````markdown
# {domain} Schema Review

> 생성일: {YYYY-MM-DD}

## 잘된 점

-

## 개선 필요

### 1. [분류] 제목

- 위치:
- 문제:
- 제안:

```graphql

```

## 체크리스트

- [x] 항목
- [ ] 항목 (→ 개선 필요 N번)

## 반영 여부

| 번호 | 반영 | 이유 |
| ---- | ---- | ---- |
````

리뷰 후 개선 항목 목록을 보여주고, 어떤 항목을 반영할지 AskUserQuestion으로 확인받아요.
승인된 항목만 `schema.graphql`과 `schema.md`에 반영하고 "반영 여부" 표를 채워요. 반영 후 schema-design의 검증 명령을 다시 실행해요.

저장 후 한 줄만 반환해요.

```
✅ schema-review.md 저장 (개선 {N}건, 반영 {N}건) → 다음: commit 1
```

## 분석 시작

$ARGUMENTS
