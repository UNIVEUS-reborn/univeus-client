---
name: verify
description: '구현한 도메인을 검증 명령과 tech-spec 체크리스트로 확인해요. migration [7] 단계예요.'
argument-hint: '<도메인명>'
---

# 검증

실제 명령 출력으로만 판단해요. 실행하지 않은 항목은 통과로 적지 않아요.

## Phase 1: 명령 검증

루트에서 순서대로 실행해요. 실패해도 멈추지 않고 전부 실행한 뒤 기록해요.

```bash
(cd apps/webview && bun run relay)
bun run check-types
bunx turbo run lint --filter=webview
bun run test
bun run build
```

## Phase 2: 체크리스트

`tech-spec.md`의 체크리스트를 항목마다 확인해요.

- 코드로 확인할 수 있는 항목(라우트 등록, 분기 존재, 문구, 토큰 사용)은 해당 파일:줄을 근거로 적어요
- 화면을 띄워야 확인되는 항목은 "수동 확인 필요"로 분류해요. 통과로 적지 않아요
- legacy-spec의 규칙(R 번호)이 체크리스트에서 빠졌으면 누락으로 적어요

## Phase 3: 규칙 위반 확인

변경된 파일에서 찾아요.

- domain/에 금지된 import (React, Stackflow, StyleX, Relay hooks)
- 테스트 없는 `domain/*.ts` (`*.relay.ts`, `*Fixtures.ts` 제외)
- 금지 동사로 시작하는 domain export (`get`, `check`, `should`, `format`, `count`, `sum`)
- `common` → `pages`, `shared` → `common`/`pages` import
- `as ` 타입 단언
- 토큰 대신 직접 쓴 색상 값 (`#`, `rgb(`)
- 주석
- 직접 호출한 Stackflow API (`useFlow`, `useActions`)

## 산출물

`.claude/__generated__/migration/{domain}/verify.md`

```markdown
# {domain} Verify

> 실행일: {YYYY-MM-DD}

## 명령

| 명령 | 결과 | 비고 |
| --- | --- | --- |
| relay | ✅ / ❌ | |

## 체크리스트

| 항목 | 결과 | 근거 |
| --- | --- | --- |

## 규칙 위반

| 파일:줄 | 위반 |
| --- | --- |

## 수동 확인 필요

- {항목}: {확인 방법}

## 결론

PASS / FAIL ({실패 항목 수})
```

저장 후 한 줄만 반환해요.

```
✅ verify PASS (수동 확인 {N}건) → 다음: commit 2
❌ verify FAIL ({N}건) → 다음: implement 수정
```

## 분석 시작

$ARGUMENTS
