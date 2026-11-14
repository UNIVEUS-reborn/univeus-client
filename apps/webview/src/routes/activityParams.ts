export type MainTab = 'home' | 'chat' | 'my'

export type MainParams = {
  tab?: MainTab
}

export type SearchParams = Record<string, never>

export type GroupFormStep = 'schedule' | 'content'

export type GroupCreateParams = {
  step?: GroupFormStep
}

export type GroupDetailParams = {
  groupId: string
}

export type GroupEditParams = {
  groupId: string
  step?: GroupFormStep
}

export type UserProfileParams = {
  userId: string
}

export type SettingsParams = Record<string, never>

export type ProfileEditParams = Record<string, never>

export type IntroductionParams = Record<string, never>

export type IntroductionEditParams = {
  from?: 'my'
}

export type LandingParams = Record<string, never>

export type SignupStepParam = 'identity' | 'terms' | 'affiliation' | 'profile'

export type SignupParams = {
  step?: SignupStepParam
}
