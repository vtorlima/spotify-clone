import { LibraryPanel } from "../library/LibraryPanel";

export default function Sidebar() {
  return (
    <aside className="w-[310px] shrink-0 overflow-y-auto rounded-lg bg-background-base p-2">
      <LibraryPanel />
    </aside>
  )
}
