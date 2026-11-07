---
name: legacy-analyze
description: 'UNIVEUS 레거시 코드에서 도메인 하나의 화면, API, 비즈니스 규칙, 문구를 추출해 legacy-spec.md를 만들어요. migration [1] 단계예요.'
argument-hint: '<도메인명>'
---

# 레거시 분석

레거시: https://github.com/UMC-UNIVEUS/UNIVEUS-MobileWeb (CRA + React Router + REST)

## Phase 1: 레거시 코드 준비

```bash
LEGACY=.claude/__generated__/legacy/UNIVEUS-MobileWeb
[ -d "$LEGACY" ] || git -c credential.helper= clone --depth 1 https://github.com/UMC-UNIVEUS/UNIVEUS-MobileWeb.git "$LEGACY"
```

- 라우트 정의: `src/App.js`
- 화면: `src/pages/*.jsx`, 공통 컴포넌트: `src/components/*.jsx`
- API는 `https://univeus.site`를 axios로 직접 호출해요

## Phase 2: 범위 확인

1. `.claude/migration/roadmap.md`에서 도메인의 범위를 읽어요
2. 범위에 해당하는 레거시 라우트와 파일을 찾아요
3. 다른 도메인과 겹치는 화면은 이 도메인이 맡을 부분만 표시해요 (예: 모임 상세의 참여 버튼은 participation)

base 도메인은 특정 화면 대신 공통 요소를 분석해요: `App.js` 라우팅 구조, `Header`, `NavBar`, `Footer`, 전역 스타일(`index.scss`, `App.scss`)의 색상과 폰트, 공통 컴포넌트(`Button`, `Modal`, `Toggle`).

## Phase 3: 추출

파일을 끝까지 읽고 추출해요. 이름만 보고 추측하지 않아요.

- **화면**: 레거시 라우트, 역할, 화면 구성(위에서 아래 순서), 진입 경로와 이동하는 곳
- **사용자 행동**: 버튼, 입력, 그 결과
- **데이터**: 화면이 실제로 쓰는 필드 (응답 필드명 그대로)
- **API**: 메서드, 경로, 요청 값, 응답에서 쓰는 필드
- **비즈니스 규칙**: 입력 검증(글자 수, 형식), 노출 조건, 가능/불가 조건, 상태 값
- **상태 화면**: 로딩, 빈 목록, 에러, 권한 없음
- **문구**: 사용자에게 보이는 텍스트 (화면별)
- **불일치·버그**: 화면마다 다른 규칙, 동작하지 않는 코드, 미구현

개인정보(실명, 전화번호, 이메일)는 산출물에 옮기지 않아요.

## Phase 4: 불일치 확인

불일치·버그 항목마다 어떻게 옮길지 AskUserQuestion으로 확인해요. 답은 legacy-spec의 "결정" 칸에 기록해요.

## 산출물

`.claude/__generated__/migration/{domain}/legacy-spec.md`

```markdown
# {domain} Legacy Spec

> 레거시 커밋: {git -C $LEGACY rev-parse --short HEAD}
> 생성일: {YYYY-MM-DD}

## 화면

### {화면 이름} — `{레거시 라우트}` (`{파일}`)

- 역할:
- 구성:
- 이동:
- 사용자 행동:
- 데이터 필드:
- 상태 화면:
- 문구:

## API

| 메서드 | 경로 | 요청 | 쓰는 응답 필드 | 사용 화면 |
| --- | --- | --- | --- | --- |

## 비즈니스 규칙

| ID | 규칙 | 출처 (파일:줄) |
| --- | --- | --- |
| R1 | | |

## 불일치·버그

| ID | 내용 | 결정 |
| --- | --- | --- |

## 범위 밖

- 다른 도메인이 맡는 부분과 옮기지 않는 부분
```

비즈니스 규칙 ID(R1, R2…)는 domain-spec, tech-spec, verify가 그대로 참조해요.

저장 후 한 줄만 반환해요.

```
✅ legacy-spec.md 저장 (화면 {N}개, 규칙 {N}개, 불일치 {N}개) → .claude/__generated__/migration/{domain}/legacy-spec.md
```

## 분석 시작

$ARGUMENTS
