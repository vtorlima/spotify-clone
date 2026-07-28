import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FiMenu } from "react-icons/fi";
import type { Music } from "../../types/music";
import type { TrackPlaylistContext } from "../../hooks/useTrackMenuItems";
import { MusicRow } from "./MusicRow";

interface SortableMusicRowProps {
  music: Music;
  position: number;
  queue: Music[];
  disabled?: boolean;
  playlistContext?: TrackPlaylistContext;
}

export function SortableMusicRow({
  music,
  position,
  queue,
  disabled,
  playlistContext,
}: SortableMusicRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({ id: music.id, disabled });

  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: music.id, disabled });

  function setNodeRef(node: HTMLElement | null) {
    setDragRef(node);
    setDropRef(node);
  }

  const dragStyle = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const dragHandle = (
    <button
      type="button"
      aria-label="Arrastar para reordenar"
      disabled={disabled}
      className="cursor-grab text-text-subdued hover:text-text-base active:cursor-grabbing disabled:cursor-default disabled:opacity-40"
      {...listeners}
      {...attributes}
    >
      <FiMenu className="text-[16px]" />
    </button>
  );

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      className={`rounded-md ${isOver ? "ring-1 ring-accent" : ""} ${
        isDragging ? "relative z-10 opacity-80" : ""
      }`}
    >
      <MusicRow
        music={music}
        position={position}
        queue={queue}
        dragHandle={dragHandle}
        playlistContext={playlistContext}
      />
    </div>
  );
}
