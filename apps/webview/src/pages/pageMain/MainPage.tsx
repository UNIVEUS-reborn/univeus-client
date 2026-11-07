import { useActivityParams } from '@stackflow/react'
import { useState } from 'react'

import { BottomNav, type BottomNavItem } from '@src/components/shared/BottomNav'
import { ChatIcon, HomeIcon, MyIcon } from '@src/components/shared/icons'
import { MainHeaderActions, MainHeaderLogo } from '@src/components/shared/MainHeader'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { ChatTab } from '@src/pages/pageMain/tabs/ChatTab'
import { HomeTab } from '@src/pages/pageMain/tabs/HomeTab'
import { MyTab } from '@src/pages/pageMain/tabs/MyTab'
import { Activity } from '@src/routes/activityNames'
import type { MainTab } from '@src/routes/activityParams'

const tabs: BottomNavItem<MainTab>[] = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'chat', label: '모임채팅', Icon: ChatIcon },
  { key: 'my', label: '마이페이지', Icon: MyIcon },
]

export function MainPage() {
  const params = useActivityParams<typeof Activity.MAIN>()
  const [currentTab, setCurrentTab] = useState<MainTab>(params.tab ?? 'home')

  return (
    <ScreenLayout
      renderLeft={() => <MainHeaderLogo />}
      renderRight={() => <MainHeaderActions />}
      bottom={<BottomNav items={tabs} current={currentTab} onChange={setCurrentTab} />}
    >
      {currentTab === 'home' && <HomeTab />}
      {currentTab === 'chat' && <ChatTab />}
      {currentTab === 'my' && <MyTab />}
    </ScreenLayout>
  )
}
