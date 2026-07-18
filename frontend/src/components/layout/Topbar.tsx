export default function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center px-4">
      <input
        type="text"
        placeholder="O que você quer ouvir?"
        className="mx-auto h-10 w-96 rounded-full bg-searchbox-bg px-4 text-12px text-text-base placeholder:text-text-subdued"
      />
    </header>
  )
}