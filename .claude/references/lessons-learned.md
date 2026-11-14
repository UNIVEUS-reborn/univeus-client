# Lessons Learned

작업 전에 관련 태그의 교훈을 확인해요. 새 교훈은 retrospect에서 사용자가 승인하면 추가해요.

| ID   | 태그                  | 교훈                                                                                                                                                                 |
| ---- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L001 | tooling, stylex       | `@stylexjs/unplugin` 타입이 CJS로 잘못 선언돼 있어요. `tsconfig.node.json`을 `module: preserve`로 두면 캐스트 없이 쓸 수 있어요                                      |
| L002 | tooling, stylex, test | StyleX 플러그인 dev 기능이 vitest 종료를 막아요. `mode === 'test'`면 `devMode: 'off'`                                                                                |
| L003 | tooling, stylex       | Vite에서는 StyleX 플러그인이 dev CSS·런타임을 자동 주입해요. `virtual:stylex:runtime`을 직접 import하지 않아요                                                       |
| L004 | tooling, bun          | 전역 `~/.npmrc`의 registry·프록시 설정이 `bunfig.toml`보다 우선해요. registry는 레포 `.npmrc`로 지정해요                                                             |
| L005 | stackflow             | Stackflow 2는 `defineConfig({ activities, transitionDuration })` + `stackflow({ config, components, plugins })` 형태예요. 1.x 예제를 쓰지 않아요                     |
| L006 | relay                 | relay-compiler는 `artifactDirectory`가 없으면 실행되지 않아요. `src/__generated__/.gitkeep`을 유지해요                                                               |
| L007 | convention            | 코드·설정 파일에 주석을 달지 않아요                                                                                                                                  |
| L008 | schema                | 수정 Input이 전체 값을 다시 보내면 조회 타입에도 그 값을 다시 만들 id가 있어야 해요. `Group.images`에 `Image.id`가 없으면 수정할 때 기존 이미지를 보낼 수 없어요     |
| L009 | domain                | 판단할 수 없는 상태의 기본값은 차단이에요. `viewerRole`을 모르면 참여 버튼을 보여주지 않아요                                                                         |
| L010 | domain, type          | 판별 함수는 boolean 대신 이유가 담긴 union을 반환해요. `canJoinGroup`은 `{ type: 'BLOCKED', reason: 'GENDER' }`처럼 왜 막혔는지 알려줘요                             |
| L011 | relay, type           | Relay가 enum 타입에 `'%future added value'`를 추가해요. `GroupStatus`를 switch할 때 이 값도 처리해요                                                                 |
| L012 | relay, domain         | `.relay.ts`는 fragment를 읽어 domain 입력으로 바꾸기만 해요. 판단은 순수 `*.ts`에서 해요                                                                             |
| L013 | relay, error          | "참여 승인 완료" 같은 성공 피드백은 mutation `onCompleted`에서 `error`가 없는지 확인한 뒤에만 보여줘요                                                               |
| L014 | relay                 | optimisticResponse에 fragment 데이터를 spread하지 않아요. 필요한 필드만 명시해요                                                                                     |
| L015 | relay, react19        | `network-only`는 쓰지 않아요. React 19 StrictMode dev에서 Suspense 내용이 다시 보일 때마다 Relay가 새로 요청해서 무한 요청이 생겨요. Suspense 경계로는 막히지 않아요 |
| L016 | domain                | `participantCount ?? 0`처럼 빠진 데이터를 기본값으로 숨기지 않아요. 타입에서 null을 드러내요                                                                         |
| L017 | migration             | 레거시 화면을 옮길 때 핸들러의 검증 가드를 input prop 제약(maxLength, disabled)으로만 대체하지 않아요                                                                |
| L018 | migration             | 레거시는 같은 규칙이 화면마다 달라요 (홈 탭과 작성 화면의 카테고리 목록). legacy-analyze에서 불일치로 기록하고 사용자 결정을 받아요                                  |
| L019 | workflow              | 실제 검증 명령 출력으로만 완료를 말해요                                                                                                                              |
