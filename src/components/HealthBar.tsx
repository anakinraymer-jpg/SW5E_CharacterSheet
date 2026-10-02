import type { Character } from "../types";
import { effectiveMaxHp } from "../classFeatureLogic";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

export default function HealthBar({ character, update }: Props) {
  const max = effectiveMaxHp(character);
  const pct = max > 0 ? Math.max(0, Math.min(100, (character.currentHp / max) * 100)) : 0;
  const state = pct <= 25 ? "health-critical" : pct <= 50 ? "health-wounded" : "health-healthy";

  function adjust(delta: number) {
    const ceiling = max > 0 ? max : Infinity;
    update("currentHp", Math.max(0, Math.min(ceiling, character.currentHp + delta)));
  }

  return (
    <div className={`health-bar-wrap ${state}`}>
      <div className="health-bar-track">
        <div className="health-bar-fill" style={{ width: `${pct}%` }} />
        <div className="health-bar-label">
          {character.currentHp} / {max} HP
          {character.tempHp > 0 && <span className="health-bar-temp">+{character.tempHp} temp</span>}
        </div>
      </div>
      <div className="health-bar-controls">
        <button type="button" className="btn btn-secondary btn-small" onClick={() => adjust(-5)}>
          −5
        </button>
        <button type="button" className="btn btn-secondary btn-small" onClick={() => adjust(-1)}>
          −1
        </button>
        <button type="button" className="btn btn-secondary btn-small" onClick={() => adjust(1)}>
          +1
        </button>
        <button type="button" className="btn btn-secondary btn-small" onClick={() => adjust(5)}>
          +5
        </button>
      </div>
    </div>
  );
}
