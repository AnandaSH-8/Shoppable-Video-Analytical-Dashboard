import { useCallback, useState } from "react";
import { createEngagementEvent } from "../../services/api";
import type { EngagementEventType } from "../../types";
import commonStyles from "../../styles/common.module.css";
import styles from "./styles.module.css";

interface SimulateTrafficButtonProps {
  videoIds: number[];
  onSimulated: () => Promise<void>;
}

const EVENT_TYPES: EngagementEventType[] = ["view", "click", "add_to_cart"];

const pickRandom = <T,>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

export const SimulateTrafficButton = ({
  videoIds,
  onSimulated,
}: SimulateTrafficButtonProps) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const simulate = useCallback(async (): Promise<void> => {
    if (videoIds.length === 0) {
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      await createEngagementEvent({
        videoId: pickRandom(videoIds),
        eventType: pickRandom(EVENT_TYPES),
      });
      await onSimulated();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to simulate traffic",
      );
    } finally {
      setIsSending(false);
    }
  }, [videoIds, onSimulated]);

  return (
    <div className={styles.simulate}>
      <button
        type="button"
        className={commonStyles.button}
        onClick={() => {
          void simulate();
        }}
        disabled={isSending || videoIds.length === 0}
      >
        {isSending ? "Simulating…" : "Simulate Traffic"}
      </button>
      {error !== null && (
        <span className={commonStyles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
