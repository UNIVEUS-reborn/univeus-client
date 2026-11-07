# UNIVEUS 마이그레이션 로드맵

레거시: https://github.com/UMC-UNIVEUS/UNIVEUS-MobileWeb (CRA + REST)
대상: `apps/webview` (Vite + Stackflow + StyleX + Relay), `apps/shell` (Expo 웹뷰 쉘)

## 도메인

| 순서 | 도메인 | 범위 | schema | views |
| ---- | ------ | ---- | ------ | ----- |
| C0 | base | routes, stackflow, 토큰, ScreenLayout, BottomNav, mock network | - | ⬜ |
| C1 | group | 홈 탭, 검색, 모임 상세, 모임 작성/수정, 관리 시트 | ✅ (리뷰 반영 전) | ⬜ |
| C2 | participation | 참여 신청/취소/승인, 참여자 목록 | ⬜ | ⬜ |
| C3 | profile | 마이 탭, 유저 프로필, 신고, N문 N답, 프로필 수정, 설정 | ⬜ | ⬜ |
| C4 | auth | 랜딩(구글 로그인), 회원가입 4단계 | ⬜ | ⬜ |

채팅은 범위 밖이에요. 채팅 탭은 "준비 중" 화면만 둬요.

## 확정된 결정

- 모임 엔티티 이름은 `Group`
- `GroupCategory`는 수업친구(`CLASS_FRIEND`)와 기타모임(`ETC`)을 둘 다 포함
- `User`는 C1부터 `admissionYear`, `college` 포함
- 모집 상태(`GroupStatus`)와 마감(모임 3시간 전)은 서버가 판단
- 이미지는 presigned URL 업로드 후 `imageIds`로 전달
- 도메인마다 schema 커밋과 views 커밋을 나눠요

## 미정

- 이미지 개수 제한
- 참여자가 생긴 뒤 일시·장소·성별 조건 수정 허용 여부
- 탈퇴한 호스트의 모임 처리 (`Group.host` nullability)
- schema 위치 (모노레포 공유 vs 서버 레포)
