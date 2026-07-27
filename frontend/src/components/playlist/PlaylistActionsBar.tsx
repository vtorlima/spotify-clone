import { FiDownload, FiEdit2, FiTrash2 } from "react-icons/fi";
import { ActionMenu, type ActionMenuItem } from "../ui/ActionMenu";
import { PlayButton } from "../ui/PlayButton";

interface PlaylistActionsBarProps {
  canPlay: boolean;
  onPlay: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function PlaylistActionsBar({
  canPlay,
  onPlay,
  onEdit,
  onDelete,
}: PlaylistActionsBarProps) {
  const items: ActionMenuItem[] = [
    {
      id: "edit",
      label: "Editar os detalhes",
      icon: <FiEdit2 className="text-[16px]" />,
      onSelect: onEdit,
    },
    {
      id: "delete",
      label: "Apagar",
      icon: <FiTrash2 className="text-[16px]" />,
      variant: "danger",
      onSelect: onDelete,
    },
    {
      id: "download",
      label: "Baixar",
      icon: <FiDownload className="text-[16px]" />,
      disabled: true,
    },
  ];

  return (
    <div className="flex items-center gap-6">
      <PlayButton
        as="button"
        size="lg"
        disabled={!canPlay}
        ariaLabel="Tocar playlist"
        onClick={onPlay}
      />
      <ActionMenu ariaLabel="Mais opções da playlist" items={items} />
    </div>
  );
}
