import { CurrentTrackPanel } from "./CurrentTrackPanel";

export default function RightPanel() {
  return (
    <aside className="w-[310px] shrink-0 overflow-y-auto rounded-lg bg-background-base p-4">
      <CurrentTrackPanel />
    </aside>
  )
}
