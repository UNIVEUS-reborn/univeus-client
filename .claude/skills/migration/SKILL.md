---
name: migration
description: 'UNIVEUS 레거시 마이그레이션 워크플로우 오케스트레이터. 도메인 하나를 레거시 분석부터 schema, domain, 화면 구현, 검증까지 단계별로 진행해요. "마이그레이션", "migration", "다음 단계", "다음 도메인" 등에 사용해요.'
argument-hint: '[도메인명] [단계명]'
---

# 마이그레이션 오케스트레이터

레거시(UNIVEUS-MobileWeb)를 도메인 단위로 `apps/webview`에 옮겨요.
단계 사이의 정보는 모두 산출물 파일로 주고받아요.

- 진행 현황(커밋함): `.claude/migration/roadmap.md`
- 도메인 산출물(gitignore): `.claude/__generated__/migration/{domain}/`
- 공통 원칙: `.claude/references/architecture.md`
- 교훈: `.claude/references/lessons-learned.md`

## 단계

| 단계 | 스킬 | 산출물 | 건너뛰는 경우 |
| --- | --- | --- | --- |
| [1] legacy | `legacy-analyze` | `legacy-spec.md` | 없음 |
| [2] schema | `schema-design` | `schema.md` + `apps/webview/schema.graphql` 수정 | schema 변경 없음 (base) |
| [2.5] schema-review | `schema-review` | `schema-review.md` | [2]를 건너뛰면 같이 |
| ⏸ commit 1 | 사용자 | schema 커밋 | [2]를 건너뛰면 같이 |
| [3] domain-spec | `domain-spec` | `domain-spec.md` | 비즈니스 로직 없음 (base) |
| [4] tech-spec | `tech-spec` | `tech-spec.md` | 없음 |
| [5] tdd | `tdd` | `tdd-summary.md` + 테스트 | [3]을 건너뛰면 같이 |
| [6] implement | `implement` | `implement-summary.md` | 없음 |
| [7] verify | `verify` | `verify.md` | 없음 |
| ⏸ commit 2 | 사용자 | 화면 커밋 | 없음 |
| [8] retrospect | 이 스킬 | `retrospect.md` | 사용자가 원하지 않으면 |

건너뛴 단계는 산출물 대신 `skipped.md`에 `[단계] 이유`를 한 줄씩 기록해요.

## Phase 1: 도메인과 상태 파악

1. `roadmap.md`를 읽어요
2. 도메인 결정
   - 인자에 도메인이 있으면 그 도메인
   - 없으면 roadmap에서 진행 중인 도메인, 그것도 없으면 다음 순서의 ⬜ 도메인
3. `ls .claude/__generated__/migration/{domain}/`로 산출물을 확인해요
4. commit 상태는 git으로 확인해요
   - commit 1: `schema.md`가 있고 `git status --porcelain apps/webview/schema.graphql`이 비어 있으면 완료
   - commit 2: `verify.md`가 있고 `git status --porcelain apps/webview`가 비어 있으면 완료
5. 상태를 이 형식으로 보여줘요

```
📋 마이그레이션 상태 (group)

[1]   legacy         ✅ legacy-spec.md
[2]   schema         ✅ schema.md
[2.5] schema-review  ⬜
⏸     commit 1       ⬜
[3]   domain-spec    ⬜
...
```

## Phase 2: 다음 단계 제안

| 현재 상태 | 다음 |
| --- | --- |
| 산출물 없음 | [1] legacy |
| legacy-spec만 있음 | [2] schema (base는 [4]) |
| schema.md 있음, schema-review 없음 | [2.5] schema-review |
| schema-review 있음, schema.graphql 미커밋 | commit 1 |
| commit 1 완료 | [3] domain-spec |
| domain-spec 있음 | [4] tech-spec |
| tech-spec 있음 | [5] tdd (domain-spec을 건너뛰었으면 [6]) |
| tdd-summary 있음 | [6] implement |
| implement-summary 있음 | [7] verify |
| verify.md에 실패 항목 있음 | [6] implement (수정) → [7] 재실행 |
| verify 통과, 미커밋 | commit 2 |
| commit 2 완료 | [8] retrospect 또는 다음 도메인 |

AskUserQuestion으로 물어봐요. 추천 단계를 첫 번째에 `(Recommended)`로 두고, 다른 가능한 단계와 "상태만 확인"을 선택지로 줘요.
이미 끝난 단계도 다시 실행할 수 있어요.

## Phase 3: 실행

- 하위 스킬은 Skill 도구로 호출하고, 인자로 도메인명을 넘겨요
- 하위 스킬은 결과를 파일에 쓰고 한 줄 요약만 반환해요. 내용이 필요하면 파일을 읽어요
- [2.5] schema-review는 리뷰, 반영 항목 확인, `schema.graphql` 반영까지 스킬 안에서 끝내요
- 단계가 끝나면 Phase 1부터 다시 돌아 다음 단계를 제안해요

### commit 1 / commit 2

- 커밋은 사용자가 해요. 직접 커밋하지 않아요
- `git log --format=%s -5`로 최근 형식을 확인하고 메시지를 추천해요 (`feat(webview): {도메인} 스키마 추가` 형태)
- 이번 단계에서 바뀐 파일 목록을 같이 보여줘요
- `roadmap.md`의 해당 도메인 schema / views 칸을 ✅로 바꿔요. roadmap 수정도 같은 커밋에 포함되게 커밋 전에 바꿔요
- 단계에서 확정된 결정과 남은 미정 사항을 roadmap에 반영해요

### [8] retrospect

1. 해당 도메인의 산출물 전부와 `verify.md`를 읽어요
2. 이렇게 정리해서 `retrospect.md`에 저장해요
   - 다음 도메인에도 쓸 패턴
   - 새로 알게 된 도메인 규칙
   - 스킬 개선점 (파일 경로 + 고칠 내용)
   - 주의 사항
3. `lessons-learned.md`에 추가할 교훈과 스킬 수정안은 제안만 하고, 사용자가 승인한 것만 반영해요

## 인자

- 없음: Phase 1 → Phase 2
- `{domain}`: 그 도메인으로 Phase 1 → Phase 2
- `{domain} {단계}`: 상태를 확인한 뒤 그 단계 실행

## 원칙

- 강제하지 않아요. 사용자가 순서를 바꾸거나 건너뛰면 따라요
- 사용자가 schema만 요청하면 schema까지만 해요. 다음 단계로 넘어가지 않아요
- 산출물이 남아 있으니 새 세션에서도 이어서 진행할 수 있어요
