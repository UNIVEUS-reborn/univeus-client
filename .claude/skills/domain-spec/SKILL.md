---
name: domain-spec
description: 'legacy-spec의 비즈니스 규칙과 schema를 기반으로 domain/ 순수 함수의 시그니처와 케이스를 설계해요. migration [3] 단계예요.'
argument-hint: '<도메인명>'
---

# Domain Spec

## Phase 1: 입력 수집

- `.claude/references/architecture.md`의 "domain 규칙" (필수)
- `.claude/__generated__/migration/{domain}/legacy-spec.md` (필수)
- `.claude/__generated__/migration/{domain}/schema.md`
- `apps/webview/schema.graphql`
- `.claude/references/lessons-learned.md`에서 `domain`, `type` 태그

## Phase 2: 함수 후보 추출

legacy-spec의 비즈니스 규칙(R 번호)마다 판단 주체를 정해요.

| 판단 주체                | 처리                          |
| ------------------------ | ----------------------------- |
| 서버 필드로 이미 확정됨  | domain 함수 없음. 근거만 기록 |
| 클라이언트가 판단해야 함 | domain 함수                   |
| 포맷·단순 산술           | `utils/` (domain 아님)        |
| mutation 호출, 상태 변경 | hook (domain 아님)            |

동사는 architecture.md의 동사 표를 따라요. union을 반환하면 `classify` 또는 `can`이에요.

### 위치

- 한 페이지에서만 쓰면 `pages/{pageName}/domain/`
- 여러 페이지에서 쓰면 `components/common/{Entity}/domain/`

### 입력 타입

- domain 파일 안에 필요한 필드만 가진 타입을 선언해요
- fragment에서 읽어야 하면 `*.relay.ts`가 `readInlineData` 결과를 이 타입으로 변환해요
- enum 입력에는 `'%future added value'`가 들어올 수 있으니, 처리할 수 없는 값의 결과를 정해둬요 (기본은 차단·UNKNOWN)

## Phase 3: 확인

함수 목록(이름, 위치, 출처 R 번호, relay.ts 필요 여부)을 보여주고 AskUserQuestion으로 확인받아요.

## 산출물

`.claude/__generated__/migration/{domain}/domain-spec.md`

````markdown
# {domain} Domain Spec

> 생성일: {YYYY-MM-DD}

## 함수 목록

| 함수                  | 동사 유형 | 위치                          | 출처   | relay.ts |
| --------------------- | --------- | ----------------------------- | ------ | -------- |
| `classifyGroupAction` | classify  | pages/pageGroupDetail/domain/ | R3, R4 | ✅       |

## 서버가 판단하는 규칙

| 규칙 | 서버 필드 |
| ---- | --------- |

## {함수명}

**시그니처**

```typescript
type GroupActionInput = {
  status: GroupStatus
  viewerRole: GroupViewerRole
}

function classifyGroupAction(
  input: GroupActionInput,
): { type: 'MANAGE' } | { type: 'JOIN' } | { type: 'BLOCKED'; reason: 'CLOSED' | 'UNKNOWN' }
```

**규칙**

- R3: ...

**엣지 케이스**

- 알 수 없는 enum 값 → `{ type: 'BLOCKED', reason: 'UNKNOWN' }`

**fragment** (relay.ts가 필요한 경우)

```graphql
fragment groupAction_group on Group @inline {
  status
  viewerRole
}
```
````

저장 후 한 줄만 반환해요.

```
✅ domain-spec.md 저장 (함수 {N}개) → .claude/__generated__/migration/{domain}/domain-spec.md
```

## 분석 시작

$ARGUMENTS
