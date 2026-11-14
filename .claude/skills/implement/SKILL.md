---
name: implement
description: 'tech-spec과 tdd 테스트를 기반으로 도메인의 화면을 구현해요. migration [6] 단계예요.'
argument-hint: '<도메인명> [구현 대상]'
---

# 구현

## Phase 1: 입력 수집

- `.claude/references/architecture.md` (필수)
- `.claude/references/lessons-learned.md`에서 tech-spec이 다루는 태그 전부
- `.claude/__generated__/migration/{domain}/tech-spec.md` (필수)
- 같은 폴더의 `domain-spec.md`, `tdd-summary.md`, `legacy-spec.md`
- `apps/webview/schema.graphql`

tech-spec이 없으면 tech-spec을 먼저 실행할지 물어봐요.
verify에서 돌아온 경우 `verify.md`의 실패 항목만 고쳐요.

## Phase 2: 순서 확인

의존 순서로 정하고 사용자에게 보여준 뒤 시작해요.

1. 스타일 토큰, routes / activity 등록
2. domain 함수 (`*.ts`, `*.relay.ts`) → tdd 테스트 통과
3. graphql (query, fragment, mutation) → `bun run relay`
4. mock network 데이터
5. 컴포넌트 (shared → common → pages, 하위부터)
6. 페이지 조립, Suspense 경계

## Phase 3: 구현

- tech-spec의 상태 종류, 핸들러 위치, UI 분기를 그대로 따라요. 다르게 해야 하면 멈추고 물어봐요
- 새 UI 요소를 만들기 전에 `components/shared`, `components/common`에 이미 있는지 찾아요
- 레거시의 검증 가드를 UI prop 제약으로만 대체하지 않아요
- mock은 graphql-tools store에 엔티티를 저장해서, 목록·상세·mutation 결과가 같은 `id`의 같은 데이터를 돌려줘요. 매번 새로 지어내면 다른 query가 같은 레코드를 덮어쓰고 목록 반영을 확인할 수 없어요
- 화면 분기를 가르는 mock 값(호스트 여부, 승인 결과 등)은 랜덤이 아니라 입력 ID로 정해요. 어떤 ID가 어떤 분기인지 implement-summary에 적어요
- mutation마다 에러 분기를 입력으로 고를 수 있는 mock 규칙을 하나씩 둬요 (예: 닉네임에 "중복"이 들어가면 `DuplicatedNicknameError`). 입력으로 고를 수 없으면 verify에서 mock을 잠깐 바꿔 확인하고 되돌려요
- 사용자에게 보이는 문구는 legacy-spec 문구를 기준으로 써요
- 주석을 달지 않아요
- graphql 태그를 바꿀 때마다 `bun run relay`

단계마다 확인해요.

```bash
cd apps/webview
bun run relay
bunx tsc -b
bunx vitest run
```

## 산출물

`.claude/__generated__/migration/{domain}/implement-summary.md`

```markdown
# {domain} Implement Summary

## 생성

- {경로}

## 수정

- {경로}

## tech-spec과 달라진 점

- {무엇을, 왜}

## 확인

- relay: pass / fail
- tsc: pass / fail
- vitest: {N} passed
```

코드는 대화에 출력하지 않아요. 변경 파일 목록만 반환해요 (10개가 넘으면 10개 + `외 {N}개`).

```
✅ 구현 완료 — 변경 파일 {N}개 → 다음: verify
```

## 분석 시작

$ARGUMENTS
