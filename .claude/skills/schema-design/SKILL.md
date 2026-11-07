---
name: schema-design
description: 'legacy-spec을 기반으로 도메인의 GraphQL 스키마를 설계하고 apps/webview/schema.graphql에 반영해요. migration [2] 단계예요.'
argument-hint: '<도메인명>'
---

# GraphQL 스키마 설계

## Phase 1: 입력 수집

- `.claude/skills/schema-design/references/conventions.md` (필수)
- `.claude/__generated__/migration/{domain}/legacy-spec.md` (필수)
- `apps/webview/schema.graphql` (현재 스키마)
- `.claude/migration/roadmap.md` (확정된 결정)

legacy-spec이 없으면 `legacy-analyze`를 먼저 실행할지 물어봐요.

## Phase 2: 설계

1. legacy-spec의 화면과 API에서 엔티티, 관계, 필요한 Query와 Mutation을 뽑아요
2. REST 응답 형태를 그대로 옮기지 않아요. 화면이 필요한 데이터 단위로 다시 설계해요
3. 레거시에서 클라이언트가 판단하던 규칙 중 서버가 맡아야 하는 것(시간 기준 판단, 권한)은 서버 필드로 올려요
4. 이미 있는 타입은 다시 정의하지 않고 확장해요
5. 다른 도메인이 쓸 필드는 roadmap 범위를 보고 이 도메인에 넣을지 정해요. 이 도메인 화면이 그리는 데 필요하면 넣어요

## Phase 3: 확인

설계한 타입·Query·Mutation 목록과 미정 사항을 보여주고 AskUserQuestion으로 확인받아요.

## Phase 4: 반영

1. `schema.graphql`에 반영해요 (새 타입은 관련 타입 근처에)
2. 검증해요

```bash
cd apps/webview
bun -e "require('graphql').buildSchema(require('fs').readFileSync('schema.graphql','utf8'))"
bun run relay
```

3. `schema.md` 저장

## 산출물

`.claude/__generated__/migration/{domain}/schema.md`

````markdown
# {domain} Schema

> 출처: legacy-spec.md
> 생성일: {YYYY-MM-DD}

## 추가·변경된 스키마

```graphql
# 이 도메인에서 추가하거나 바꾼 부분만
```

## 설계 근거

- 엔티티별: Node 구현 이유, 필드 출처(legacy-spec 화면·API), nullability
- Connection 적용 여부와 이유
- Mutation별: 에러 케이스와 각 에러 타입의 의미, Edge·deletedId 반환 이유, Input 구조
- 서버로 올린 규칙과 이유 (R 번호)

## 미정

- 서버와 정해야 할 것
````

저장 후 한 줄만 반환해요.

```
✅ schema.md 저장 + schema.graphql 반영 (타입 {N}, Query {N}, Mutation {N}) → 다음: schema-review
```

## 분석 시작

$ARGUMENTS
