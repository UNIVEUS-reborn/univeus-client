import '@stackflow/plugin-basic-ui/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RelayEnvironmentProvider } from 'react-relay'

import './index.css'
import { environment } from '@src/relay/environment'
import { Stack } from '@src/stackflow/stackflow'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Stack />
    </RelayEnvironmentProvider>
  </StrictMode>,
)
