import type { Activity } from '@src/routes/activityNames'
import type {
  GroupCreateParams,
  GroupDetailParams,
  GroupEditParams,
  IntroductionEditParams,
  IntroductionParams,
  LandingParams,
  MainParams,
  ProfileEditParams,
  SearchParams,
  SettingsParams,
  SignupParams,
  UserProfileParams,
} from '@src/routes/activityParams'

declare module '@stackflow/config' {
  interface Register {
    [Activity.MAIN]: MainParams
    [Activity.SEARCH]: SearchParams
    [Activity.GROUP_CREATE]: GroupCreateParams
    [Activity.GROUP_DETAIL]: GroupDetailParams
    [Activity.GROUP_EDIT]: GroupEditParams
    [Activity.USER_PROFILE]: UserProfileParams
    [Activity.SETTINGS]: SettingsParams
    [Activity.PROFILE_EDIT]: ProfileEditParams
    [Activity.INTRODUCTION]: IntroductionParams
    [Activity.INTRODUCTION_EDIT]: IntroductionEditParams
    [Activity.LANDING]: LandingParams
    [Activity.SIGNUP]: SignupParams
  }
}
