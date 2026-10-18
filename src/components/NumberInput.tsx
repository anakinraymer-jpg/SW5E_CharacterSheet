import { useState } from "react";

interface Props {
  value: number;
  onValue: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  // What an emptied field falls back to when the player leaves it (defaults to min, else 0).
  emptyValue?: number;
  // Shows -/+ buttons next to the field on touch screens (desktop browsers have native spinners).
  stepper?: boolean;
  id?: string;
  className?: string;
  title?: string;
}

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

// A number field that can be cleared while typing. It keeps the typed text as a draft and only
// commits a valid number, so wiping the field to enter a new value no longer snaps back to the old
// one; an empty or out-of-range entry is settled when the player leaves the field.
export default function NumberInput({
  value,
  onValue,
  min,
  max,
  step = 1,
  emptyValue,
  stepper = true,
  id,
  className,
  title,
}: Props) {
  const [draft, setDraft] = useState<string | null>(null);

  function clamp(n: number) {
    let out = n;
    if (min !== undefined && out < min) out = min;
    if (max !== undefined && out > max) out = max;
    return out;
  }

  function bump(direction: 1 | -1) {
    const next = clamp(round((Number.isFinite(value) ? value : 0) + direction * step));
    setDraft(null);
    if (next !== value) onValue(next);
  }

  return (
    <span className="num-input">
      {stepper && (
        <button
          type="button"
          className="num-step"
          aria-label="Decrease"
          tabIndex={-1}
          onClick={() => bump(-1)}
          disabled={min !== undefined && value <= min}
        >
          −
        </button>
      )}
      <input
        id={id}
        title={title}
        className={className}
        type="number"
        inputMode={step % 1 ? "decimal" : "numeric"}
        min={min}
        max={max}
        step={step}
        value={draft ?? String(value)}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          const text = e.target.value;
          setDraft(text);
          if (text.trim() !== "" && Number.isFinite(Number(text))) onValue(Number(text));
        }}
        onBlur={() => {
          const text = draft;
          setDraft(null);
          if (text === null) return;
          const parsed = text.trim() === "" ? NaN : Number(text);
          const settled = clamp(Number.isFinite(parsed) ? parsed : (emptyValue ?? min ?? 0));
          if (settled !== value) onValue(settled);
        }}
      />
      {stepper && (
        <button
          type="button"
          className="num-step"
          aria-label="Increase"
          tabIndex={-1}
          onClick={() => bump(1)}
          disabled={max !== undefined && value >= max}
        >
          +
        </button>
      )}
    </span>
  );
}
