import type { Activity } from '@src/routes/activityNames'
import type { MainParams } from '@src/routes/activityParams'

declare module '@stackflow/config' {
  interface Register {
    [Activity.MAIN]: MainParams
  }
}
