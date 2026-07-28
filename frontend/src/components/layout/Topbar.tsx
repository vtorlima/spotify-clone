import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiHome } from "react-icons/fi";
import { usePlayerActions } from "../../hooks/usePlayer";
import { useSearchIndex } from "../../hooks/useSearchIndex";
import type { SearchItem } from "../../types/search";
import { SearchSuggestions } from "../search/SearchSuggestions";

export default function Topbar() {
  const navigate = useNavigate();
  const { playTrack } = usePlayerActions();
  const { data: searchIndex } = useSearchIndex();

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const suggestions = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term || !searchIndex) {
      return [];
    }

    return searchIndex
      .filter((item) => item.title.toLowerCase().includes(term))
      .slice(0, 8);
  }, [search, searchIndex]);

  function handleSelect(item: SearchItem) {
    if (item.type === "music") {
      playTrack(item.data, [item.data]);
      navigate(`/album/${item.data.albumId}`);
    } else {
      navigate(`/${item.type}/${item.id}`);
    }

    setSearch("");
    setIsOpen(false);
  }

  return (
    <header className="flex h-[60px] shrink-0 items-center px-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-text-subdued transition hover:text-text-base"
        >
          <FiChevronLeft className="text-[20px]" />
        </button>

        <button
          type="button"
          onClick={() => navigate(1)}
          aria-label="Avançar"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-text-subdued transition hover:text-text-base"
        >
          <FiChevronRight className="text-[20px]" />
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Início"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-text-subdued transition hover:text-text-base"
        >
          <FiHome className="text-[18px]" />
        </button>
      </div>

      <div ref={containerRef} className="relative mx-auto w-96">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="O que você quer ouvir?"
          className="h-10 w-full rounded-full bg-searchbox-bg px-4 text-12px text-text-base placeholder:text-text-subdued"
        />

        {isOpen && search.trim().length > 0 && (
          <SearchSuggestions items={suggestions} onSelect={handleSelect} />
        )}
      </div>
    </header>
  );
}
