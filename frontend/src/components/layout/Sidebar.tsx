import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded px-4 py-2 transition-colors ${
      isActive
        ? 'font-semibold text-accent'
        : 'text-text-subdued hover:text-text-base'
    }`

  return (
    <aside className="w-[310px] shrink-0 overflow-y-auto rounded-lg bg-background-base p-4">
      <h1 className="mb-6 text-20px font-bold">MeuSpotify</h1>

      <nav className="flex flex-col gap-1">
        <NavLink to="/" end className={linkClass}>
          Início
        </NavLink>

        <NavLink to="/playlists" className={linkClass}>
          Playlists
        </NavLink>
      </nav>
    </aside>
  )
}