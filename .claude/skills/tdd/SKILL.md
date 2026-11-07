---
name: tdd
description: 'domain-spec을 기반으로 domain 함수의 실패하는 테스트를 먼저 작성해요 (Red). implement가 통과시켜요. migration [5] 단계예요.'
argument-hint: '<도메인명>'
---

# TDD (Red)

## Phase 1: 입력 수집

- `.claude/__generated__/migration/{domain}/domain-spec.md` (필수)
- `.claude/__generated__/migration/{domain}/tech-spec.md`
- `.claude/references/architecture.md`의 "테스트"

domain-spec이 없으면 domain-spec을 먼저 실행할지 물어봐요.

## Phase 2: 파일 위치

domain-spec의 위치 칸을 따라요.

```
{위치}/domain/
├── {feature}.test.ts     ← 지금 작성
├── {feature}Fixtures.ts  ← 객체 입력이면 지금 작성
├── {feature}.ts          ← implement가 작성
└── {feature}.relay.ts    ← implement가 작성
```

## Phase 3: Fixtures

- 입력이 객체일 때만 만들어요. 스칼라 입력은 테스트 안에 바로 써요
- domain 파일에 선언될 입력 타입을 기준으로, 테스트에 필요한 필드만 넣어요
- 이름에 케이스가 드러나게 해요 (`recruitingGroup`, `closedGroup`)
- 아직 `{feature}.ts`가 없으니 타입은 `import type`으로 가져오고, 이 import 에러도 Red의 일부예요

## Phase 4: 테스트

- domain-spec의 규칙과 엣지 케이스를 하나도 빼지 않고 케이스로 만들어요
- union 반환은 `toEqual`로 전체를 검증해요
- 알 수 없는 enum 값, null 입력 케이스를 포함해요
- 설명은 ~요체: `it('정원이 차면 참여할 수 없어요', ...)`
- 규칙 출처를 `describe` 이름에 넣지 않아요. 동작으로 이름을 지어요

## Phase 5: Red 확인

```bash
cd apps/webview
bunx vitest run src/.../domain/{feature}.test.ts
```

함수가 아직 없어서 실패하면 정상이에요. 이미 통과하면 기존 구현이 있는 것이니 결과를 기록해요.

## 산출물

`.claude/__generated__/migration/{domain}/tdd-summary.md`

```markdown
# {domain} TDD Summary

| 파일 | 함수 | 케이스 수 |
| --- | --- | --- |

## Red 확인

- `{feature}.test.ts`: 실패 확인 ({에러 요약})
```

저장 후 한 줄만 반환해요.

```
✅ TDD Red 완료 (테스트 파일 {N}개, 케이스 {N}건) → 다음: implement
```

## 분석 시작

$ARGUMENTS
