# UNIVEUS 마이그레이션 로드맵

레거시: https://github.com/UMC-UNIVEUS/UNIVEUS-MobileWeb (CRA + REST)
대상: `apps/webview` (Vite + Stackflow + StyleX + Relay), `apps/shell` (Expo 웹뷰 쉘)

## 도메인

| 순서 | 도메인        | 범위                                                           | schema | views |
| ---- | ------------- | -------------------------------------------------------------- | ------ | ----- |
| C0   | base          | routes, stackflow, 토큰, ScreenLayout, BottomNav, mock network | -      | ✅    |
| C1   | group         | 홈 탭, 검색, 모임 상세, 모임 작성/수정, 관리 시트              | ✅     | ✅    |
| C2   | participation | 참여 신청/취소/승인, 참여자 목록                               | ✅     | ✅    |
| C3   | profile       | 마이 탭, 유저 프로필, 신고, N문 N답, 프로필 수정, 설정         | ✅     | ⬜    |
| C4   | auth          | 랜딩(구글 로그인), 회원가입 4단계                              | ⬜     | ⬜    |

채팅은 범위 밖이에요. 채팅 탭은 "준비 중" 화면만 둬요.

## 확정된 결정

- 모임 엔티티 이름은 `Group`
- `GroupCategory`는 수업친구(`CLASS_FRIEND`)와 기타모임(`ETC`)을 둘 다 포함
- `User`는 C1부터 `admissionYear`, `college` 포함
- 모집 상태(`GroupStatus`)와 마감(모임 3시간 전)은 서버가 판단
- 이미지는 presigned URL 업로드 후 `imageIds`로 전달
- 도메인마다 schema 커밋과 views 커밋을 나눠요
- 화면 문구는 "유니버스" 유지
- 모집인원(`capacity`)은 호스트 제외 1~5명
- 모임 일시는 지금 + 3시간 이후만 허용
- 참여자가 생긴 뒤에도 모든 항목 수정 가능 (정원은 현재 참여 인원 이상)
- 작성 중 입력값은 작성 흐름 안에서만 유지
- 홈의 배너·바로가기·검증 멤버 카드는 모양만 옮겨요 (검증 멤버 카드는 고정 데이터)
- 인증 뱃지는 `User.isVerified`로 받아요
- 바텀시트는 activity가 아니라 페이지 안 컴포넌트예요. 열림 상태는 `useStepFlowModalState`로 step params에 둬서 뒤로가기로 닫혀요
- 마감된 모임은 수정만 막고 삭제는 허용해요
- 참여 인원(`participantCount`)은 승인된 참여자만 세요
- 승인·참여 취소는 모집 중에만 돼요. 모집이 끝나면 서버가 승인 대기를 지워요
- 참여 거절 기능은 없어요 (레거시대로 승인만)
- 신고는 시트 모양만 옮기고 [신고하기]는 닫기만 해요 (신고 API 없음)
- 설정의 미구현 메뉴(결제수단, 약관, 문의, 회원탈퇴)는 모양만 두고 동작 없음. 로그아웃은 C4에서 연결
- 다른 사람에게 보이는 참여 횟수는 승인된 참여만 세요. 내 마이 탭 참여 목록은 승인 대기 포함
- schema 원본은 서버 레포에 둬요. `apps/webview/schema.graphql`은 서버가 생기기 전까지 클라이언트에서 먼저 설계하는 사본이에요

## 미정

- 인증 뱃지(`User.isVerified`) 지급 기준
- 이미지 개수 제한
- 신고 API, 회원탈퇴
- 탈퇴한 호스트·참여자 처리 (`Group.host`, `Participation.user` nullability)
