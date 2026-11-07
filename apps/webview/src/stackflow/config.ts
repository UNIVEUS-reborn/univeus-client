import { defineConfig } from '@stackflow/config'

import { Activity } from '@src/routes/activityNames'
import '@src/stackflow/register'

export const config = defineConfig({
  activities: [{ name: Activity.MAIN, route: '/' }],
  transitionDuration: 350,
  initialActivity: () => Activity.MAIN,
})
