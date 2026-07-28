import { ActionMenu } from "../ui/ActionMenu";
import type { MenuItem } from "../../types/menu";

interface TrackActionMenuProps {
  items: MenuItem[];
  onOpen: () => void;
}

export function TrackActionMenu({ items, onOpen }: TrackActionMenuProps) {
  return (
    <ActionMenu
      ariaLabel="Mais opções da faixa"
      items={items}
      onOpen={onOpen}
    />
  );
}
