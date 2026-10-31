import type { Character } from "../types";
import { concentrationInfo } from "../activeEffects";
import HoverInfo from "./HoverInfo";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

// The power being concentrated on (set with the C button in Powers): its effects while it affects
// you, an "Affects me" switch for powers cast on another creature, and End. Shown under the health
// bar and at the top of Powers.
export default function ConcentrationBar({ character, update }: Props) {
  const info = concentrationInfo(character);
  if (!info) return null;
  const e = info.effect;
  return (
    <div className="concentration-bar" role="status">
      <div className="concentration-row">
        <HoverInfo title={info.name} lines={info.text ? [info.text] : ["Concentrating on this power."]}>
          <span className="concentration-name">Concentrating: {info.name}</span>
        </HoverInfo>
        {!info.selfRange && (
          <label className="crafting-check">
            <input
              type="checkbox"
              checked={info.affectsMe}
              onChange={(ev) => update("concentrationSelf", ev.target.checked)}
            />{" "}
            Affects me
          </label>
        )}
        <button type="button" className="btn btn-secondary btn-small" onClick={() => update("concentratingOn", "")}>
          End
        </button>
      </div>
      {e && (
        <div className="chip-row">
          {e.acBonus > 0 && <span className="info-chip">+{e.acBonus} AC (applied)</span>}
          {e.chips
            .filter((chip) => !(e.acBonus > 0 && /^\+\d+ AC$/.test(chip.label)))
            .map((chip) => (
              <HoverInfo key={chip.label} title={info.name} lines={[chip.detail]}>
                <span className="info-chip">{chip.label}</span>
              </HoverInfo>
            ))}
        </div>
      )}
      <p className="concentration-hint">
        Taking damage: Constitution save, DC 10 or half the damage (whichever is higher), or it ends.
      </p>
    </div>
  );
}
