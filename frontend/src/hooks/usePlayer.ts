import { useContext } from "react";
import {
  PlayerActionsContext,
  PlayerStateContext,
  type PlayerActions,
  type PlayerState,
} from "../stores/PlayerContext";

export function usePlayerState(): PlayerState {
  const context = useContext(PlayerStateContext);

  if (!context) {
    throw new Error("usePlayerState precisa estar dentro de PlayerProvider.");
  }

  return context;
}

export function usePlayerActions(): PlayerActions {
  const context = useContext(PlayerActionsContext);

  if (!context) {
    throw new Error("usePlayerActions precisa estar dentro de PlayerProvider.");
  }

  return context;
}