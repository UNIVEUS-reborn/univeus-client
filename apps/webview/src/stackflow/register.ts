import type { Activity } from '@src/routes/activityNames'
import type {
  GroupCreateParams,
  GroupDetailParams,
  GroupEditParams,
  MainParams,
  SearchParams,
} from '@src/routes/activityParams'

declare module '@stackflow/config' {
  interface Register {
    [Activity.MAIN]: MainParams
    [Activity.SEARCH]: SearchParams
    [Activity.GROUP_CREATE]: GroupCreateParams
    [Activity.GROUP_DETAIL]: GroupDetailParams
    [Activity.GROUP_EDIT]: GroupEditParams
  }
}
