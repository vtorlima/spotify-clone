import { Outlet } from 'react-router-dom'

import Topbar from './Topbar'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'
import BottomPlayer from './BottomPlayer'

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col bg-black text-text-base">
      <Topbar />

      <div className="flex flex-1 gap-2 overflow-hidden px-2 pb-2">
        <Sidebar />

        <main className="flex-1 overflow-y-auto rounded-lg bg-background-base">
          <Outlet />
        </main>

        <RightPanel />
      </div>

      <BottomPlayer />
    </div>
  )
}