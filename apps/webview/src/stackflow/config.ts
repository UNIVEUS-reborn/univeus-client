import { defineConfig } from '@stackflow/config'

import { Activity } from '@src/routes/activityNames'
import '@src/stackflow/register'

export const config = defineConfig({
  activities: [
    { name: Activity.MAIN, route: '/' },
    { name: Activity.SEARCH, route: '/search' },
    { name: Activity.GROUP_CREATE, route: '/groups/new' },
    { name: Activity.GROUP_DETAIL, route: '/groups/:groupId' },
    { name: Activity.GROUP_EDIT, route: '/groups/:groupId/edit' },
  ],
  transitionDuration: 350,
  initialActivity: () => Activity.MAIN,
})
