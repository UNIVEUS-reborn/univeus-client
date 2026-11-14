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
