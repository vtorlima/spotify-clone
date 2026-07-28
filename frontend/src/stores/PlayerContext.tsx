import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Music } from "../types/music";

export interface PlayerState {
  currentTrack: Music | null;
  queue: Music[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  progress: number;
  sourceId: string | null;
}

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  volume: 0.8,
  isMuted: false,
  progress: 0,
  sourceId: null,
};

type PlayerAction =
  | { type: "PLAY_TRACK"; track: Music; queue: Music[]; sourceId: string | null }
  | { type: "TOGGLE_PLAY" }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "SEEK"; progress: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "TOGGLE_MUTE" }
  | { type: "TICK" };

function clampVolume(volume: number): number {
  if (volume < 0) return 0;
  if (volume > 1) return 1;
  return volume;
}

function playAt(state: PlayerState, index: number): PlayerState {
  const track = state.queue[index];

  if (!track) {
    return state;
  }

  return {
    ...state,
    currentTrack: track,
    currentIndex: index,
    progress: 0,
    isPlaying: true,
  };
}

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "PLAY_TRACK": {
      const queue = action.queue.length > 0 ? action.queue : [action.track];
      const foundIndex = queue.findIndex((music) => music.id === action.track.id);
      const currentIndex = foundIndex >= 0 ? foundIndex : 0;

      return {
        ...state,
        currentTrack: queue[currentIndex],
        queue,
        currentIndex,
        isPlaying: true,
        progress: 0,
        sourceId: action.sourceId,
      };
    }

    case "TOGGLE_PLAY":
      if (!state.currentTrack) return state;
      return { ...state, isPlaying: !state.isPlaying };

    case "PLAY":
      if (!state.currentTrack) return state;
      return { ...state, isPlaying: true };

    case "PAUSE":
      return { ...state, isPlaying: false };

    case "NEXT": {
      const nextIndex = state.currentIndex + 1;

      if (nextIndex >= state.queue.length) {
        return { ...state, isPlaying: false };
      }

      return playAt(state, nextIndex);
    }

    case "PREVIOUS": {
      if (state.progress > 3) {
        return { ...state, progress: 0 };
      }

      const previousIndex = state.currentIndex - 1;

      if (previousIndex < 0) {
        return { ...state, progress: 0 };
      }

      return playAt(state, previousIndex);
    }

    case "SEEK": {
      if (!state.currentTrack) return state;

      const progress = Math.min(
        Math.max(0, action.progress),
        state.currentTrack.duration
      );

      return { ...state, progress };
    }

    case "SET_VOLUME": {
      const volume = clampVolume(action.volume);

      return {
        ...state,
        volume,
        isMuted: volume === 0,
      };
    }

    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };

    case "TICK": {
      if (!state.isPlaying || !state.currentTrack) {
        return state;
      }

      const nextProgress = state.progress + 1;

      if (nextProgress < state.currentTrack.duration) {
        return { ...state, progress: nextProgress };
      }

      const nextIndex = state.currentIndex + 1;

      if (nextIndex < state.queue.length) {
        return playAt(state, nextIndex);
      }

      return {
        ...state,
        progress: state.currentTrack.duration,
        isPlaying: false,
      };
    }
  }
}

export interface PlayerActions {
  playTrack: (track: Music, queue?: Music[], sourceId?: string) => void;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (progress: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export const PlayerStateContext = createContext<PlayerState | null>(null);
export const PlayerActionsContext = createContext<PlayerActions | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  useEffect(() => {
    if (!state.isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [state.isPlaying]);

  const actions = useMemo<PlayerActions>(
    () => ({
      playTrack: (track, queue, sourceId) =>
        dispatch({
          type: "PLAY_TRACK",
          track,
          queue: queue ?? [track],
          sourceId: sourceId ?? null,
        }),
      togglePlay: () => dispatch({ type: "TOGGLE_PLAY" }),
      play: () => dispatch({ type: "PLAY" }),
      pause: () => dispatch({ type: "PAUSE" }),
      next: () => dispatch({ type: "NEXT" }),
      previous: () => dispatch({ type: "PREVIOUS" }),
      seek: (progress) => dispatch({ type: "SEEK", progress }),
      setVolume: (volume) => dispatch({ type: "SET_VOLUME", volume }),
      toggleMute: () => dispatch({ type: "TOGGLE_MUTE" }),
    }),
    []
  );

  return (
    <PlayerActionsContext.Provider value={actions}>
      <PlayerStateContext.Provider value={state}>
        {children}
      </PlayerStateContext.Provider>
    </PlayerActionsContext.Provider>
  );
}