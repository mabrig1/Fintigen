export interface ProgressState {
  /** Keys of completed lessons, labs, and quizzes. */
  completed: string[];
  /** Index of the last item the learner was viewing. */
  itemIndex: number;
}

export const EMPTY_PROGRESS: ProgressState = { completed: [], itemIndex: 0 };

export interface ProgressStore {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => ProgressState;
  getServerSnapshot: () => ProgressState;
  set: (next: ProgressState) => void;
}

/**
 * localStorage-backed store for course progress, consumed via
 * useSyncExternalStore so server render and hydration stay consistent.
 */
export function createProgressStore(storageKey: string): ProgressStore {
  let snapshot: ProgressState | null = null;
  const listeners = new Set<() => void>();

  function read(): ProgressState {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ProgressState>;
        if (Array.isArray(parsed.completed)) {
          return {
            completed: parsed.completed.filter(
              (key): key is string => typeof key === "string"
            ),
            itemIndex:
              typeof parsed.itemIndex === "number" ? parsed.itemIndex : 0,
          };
        }
      }
    } catch {
      // corrupt or unavailable storage — start fresh
    }
    return EMPTY_PROGRESS;
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      if (snapshot === null) snapshot = read();
      return snapshot;
    },
    getServerSnapshot() {
      return EMPTY_PROGRESS;
    },
    set(next) {
      snapshot = next;
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // storage unavailable — progress just won't persist
      }
      listeners.forEach((listener) => listener());
    },
  };
}
