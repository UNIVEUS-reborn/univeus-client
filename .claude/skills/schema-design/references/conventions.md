# GraphQL 스키마 컨벤션

- 스키마 위치: `apps/webview/schema.graphql`
- 클라이언트: Relay (Node 인터페이스, Connection 패턴 필수)
- 주석은 한글 `"""`, 코드는 영문
- 서버와 클라이언트가 함께 새로 만드는 스키마라, 서버 배포 전에는 기존 필드를 바로 바꿔도 돼요

## 1. Node

엔티티는 `Node`를 구현해요.

```graphql
type Group implements Node {
  id: ID!
  _id: ID!
}
```

- `id`: Relay용 global ID
- `_id`: DB ID. URL로 조회하는 엔티티에만 둬요 (Group, User)
- URL로 조회하지 않는 Node(Image 등)는 `id`만 둬요

### ID 인자 규칙

| 위치 | 받는 값 |
| --- | --- |
| URL에서 오는 단건 조회 인자 (`group(groupId:)`) | `_id` |
| Mutation Input의 ID 필드 | global `id` |

각 필드 주석에 어느 ID인지 적어요.

## 2. Connection

```graphql
type GroupConnection {
  edges: [GroupEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type GroupEdge {
  node: Group!
  cursor: ID!
}
```

- 인자는 `first: Int, after: ID`와 필터 인자예요. 인자가 많아지면 `{Entity}Filter` input으로 묶어요
- `totalCount`는 개수를 보여주는 화면이 있을 때만 둬요 (예: 검색 결과 수)

## 3. Input 이름

`Create{Entity}Input`, `Update{Entity}Input`, `Delete{Entity}Input`, `{Entity}Filter`, 그 외는 `{Action}{Entity}Input`.

## 4. Mutation과 Result 래퍼 (필수)

```graphql
type Mutation {
  createGroup(input: CreateGroupInput!): CreateGroupResult!
}

type CreateGroupResult {
  edge: GroupEdge
  error: ErrorCreateGroup
}

union ErrorCreateGroup = InvalidGroupInput | UnexpectedError
```

- 인자는 `input` 하나
- 성공 필드와 `error`는 둘 다 nullable
- 에러 union 이름은 `Error{Action}{Entity}`, 마지막에 `UnexpectedError`
- 에러 타입은 `message: String!`을 가져요. 클라이언트가 분기에 쓸 추가 정보는 필드로 둬요 (예: `participantCount`)
- 클라이언트가 입력칸에 에러를 표시해야 하면 문자열 대신 enum 필드를 둬요 (예: `field: GroupInputField`)
- 로그인 필요 같은 공통 인증 에러는 Result에 넣지 않고 GraphQL 최상위 `errors`로 처리해요

### 반환 대상

| 작업 | 반환 |
| --- | --- |
| 목록에 추가되는 생성 | `edge: {Entity}Edge` |
| 수정·상태 변경 | 바뀐 엔티티 (`id` 포함, Relay가 캐시 자동 갱신) |
| 삭제 | `success`, `deletedId` |

전체 값을 다시 보내는 수정 Input이면, 조회 타입에 그 값을 다시 만들 수 있는 필드(id 포함)가 있는지 확인해요.

## 5. Query

```graphql
type Query {
  node(id: ID!): Node
  group(groupId: ID!): Group
  groups(category: GroupCategory, first: Int, after: ID): GroupConnection!
}
```

- 단건 조회는 nullable (없을 수 있음)
- 목록은 non-null Connection

## 6. 타입 규칙

- enum 값은 SCREAMING_SNAKE_CASE, 각 값에 한글 주석
- 날짜·시간은 `DateTime` (RFC-3339 문자열)
- ID는 항상 `ID` 타입
- 리스트와 리스트 요소는 non-null (`[Image!]!`)
- 항상 있는 필드는 non-null, 조건부로 없을 수 있는 필드만 nullable. nullable이면 설계 근거에 이유를 적어요
- 서버가 확정해야 하는 상태(시간 기준 마감, 권한, 집계)는 서버 필드로 둬요
- viewer 기준 정보는 `viewer{Something}` 필드로 둬요 (예: `viewerRole`)
- 파일 업로드는 presigned URL 발급 mutation + `imageIds`

## 7. 금지

```graphql
# ❌ Boolean 반환 mutation
closeGroup(groupId: ID!): Boolean!

# ❌ 인자 나열
createGroup(title: String!, content: String!, location: String!): Group

# ❌ nullable 리스트 요소
edges: [GroupEdge]!

# ❌ String ID
groupId: String!
```

- 서버 배포 후 기존 필드를 바꿀 때는 바로 지우지 않고 `@deprecated(reason:)`를 붙여요
