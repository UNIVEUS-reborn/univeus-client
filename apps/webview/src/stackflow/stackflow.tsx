import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { stackflow } from '@stackflow/react'

import { BackIcon } from '@src/components/shared/icons'
import { GroupCreatePage } from '@src/pages/pageGroupCreate/GroupCreatePage'
import { GroupDetailPage } from '@src/pages/pageGroupDetail/GroupDetailPage'
import { GroupEditPage } from '@src/pages/pageGroupEdit/GroupEditPage'
import { IntroductionPage } from '@src/pages/pageIntroduction/IntroductionPage'
import { IntroductionEditPage } from '@src/pages/pageIntroductionEdit/IntroductionEditPage'
import { MainPage } from '@src/pages/pageMain/MainPage'
import { ProfileEditPage } from '@src/pages/pageProfileEdit/ProfileEditPage'
import { SearchPage } from '@src/pages/pageSearch/SearchPage'
import { SettingsPage } from '@src/pages/pageSettings/SettingsPage'
import { UserProfilePage } from '@src/pages/pageUserProfile/UserProfilePage'
import { Activity } from '@src/routes/activityNames'
import { config } from '@src/stackflow/config'
import { colors, size } from '@src/styles/tokens.stylex'

export const { Stack } = stackflow({
  config,
  components: {
    [Activity.MAIN]: MainPage,
    [Activity.SEARCH]: SearchPage,
    [Activity.GROUP_CREATE]: GroupCreatePage,
    [Activity.GROUP_DETAIL]: GroupDetailPage,
    [Activity.GROUP_EDIT]: GroupEditPage,
    [Activity.USER_PROFILE]: UserProfilePage,
    [Activity.SETTINGS]: SettingsPage,
    [Activity.PROFILE_EDIT]: ProfileEditPage,
    [Activity.INTRODUCTION]: IntroductionPage,
    [Activity.INTRODUCTION_EDIT]: IntroductionEditPage,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: /android/i.test(navigator.userAgent) ? 'android' : 'cupertino',
      backgroundColor: colors.background,
      appBar: {
        height: size.headerHeight,
        borderSize: '0px',
        backgroundColor: colors.background,
        iconColor: colors.textPrimary,
        textColor: colors.textPrimary,
        backButton: { renderIcon: () => <BackIcon /> },
      },
    }),
    historySyncPlugin({ config, fallbackActivity: () => Activity.MAIN }),
  ],
})
