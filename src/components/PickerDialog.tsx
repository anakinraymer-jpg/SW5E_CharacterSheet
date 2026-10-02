import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

export interface PickerOption {
  name: string;
  group?: string;
  subtitle?: string;
}

interface Props {
  title: string;
  options: PickerOption[];
  onPick: (name: string) => void;
  onClose: () => void;
  // Lazily builds the preview text for the highlighted option (catalogs are large).
  getDetails?: (name: string) => string[];
  // Offers a "use what I typed" row for names that aren't in the list.
  allowCustom?: boolean;
  // Label for the per-row button, "+" by default.
  actionLabel?: string;
  // When set, shows a row at the top that picks "" (clears the field).
  clearLabel?: string;
}

// A searchable, scrollable menu of catalog entries; each row has a button that picks it.
export default function PickerDialog({
  title,
  options,
  onPick,
  onClose,
  getDetails,
  allowCustom,
  actionLabel = "+",
  clearLabel,
}: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const needle = query.trim().toLowerCase();
  const filtered = needle
    ? options.filter(
        (o) =>
          o.name.toLowerCase().includes(needle) ||
          o.group?.toLowerCase().includes(needle) ||
          o.subtitle?.toLowerCase().includes(needle)
      )
    : options;
  const customName = query.trim();
  const showCustom = Boolean(allowCustom && customName && !options.some((o) => o.name.toLowerCase() === needle));
  const activeName = active && filtered.some((o) => o.name === active) ? active : null;
  const details = activeName && getDetails ? getDetails(activeName) : [];

  let lastGroup: string | undefined;
  return (
    <Modal title={title} onClose={onClose} className="picker-modal">
      <input
        ref={searchRef}
        type="text"
        className="picker-search"
        placeholder="Search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          if (filtered.length === 1) onPick(filtered[0].name);
          else if (showCustom && filtered.length === 0) onPick(customName);
        }}
      />
      <div className="picker-layout">
        <div className="picker-list">
          {clearLabel && (
            <div className="picker-row picker-row-clear">
              <span className="picker-row-name">{clearLabel}</span>
              <button type="button" className="btn btn-secondary btn-small picker-add" onClick={() => onPick("")}>
                Clear
              </button>
            </div>
          )}
          {filtered.length === 0 && !showCustom && <div className="picker-empty">No matches</div>}
          {filtered.map((opt) => {
            const header = opt.group && opt.group !== lastGroup ? opt.group : null;
            lastGroup = opt.group;
            return (
              <div key={`${opt.group ?? ""}|${opt.name}`}>
                {header && <div className="picker-group-header">{header}</div>}
                <div
                  className={`picker-row${active === opt.name ? " is-active" : ""}`}
                  onMouseEnter={() => setActive(opt.name)}
                  onClick={() => setActive(opt.name)}
                >
                  <span className="picker-row-text">
                    <span className="picker-row-name">{opt.name}</span>
                    {opt.subtitle && <span className="picker-row-sub">{opt.subtitle}</span>}
                  </span>
                  <button
                    type="button"
                    className="btn btn-primary btn-small picker-add"
                    title="Add"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPick(opt.name);
                    }}
                  >
                    {actionLabel}
                  </button>
                </div>
              </div>
            );
          })}
          {showCustom && (
            <div className="picker-row picker-row-custom">
              <span className="picker-row-text">
                <span className="picker-row-name">Use “{customName}”</span>
                <span className="picker-row-sub">custom entry (not in the catalog)</span>
              </span>
              <button type="button" className="btn btn-secondary btn-small picker-add" onClick={() => onPick(customName)}>
                {actionLabel}
              </button>
            </div>
          )}
        </div>
        {getDetails && (
          <div className="picker-details">
            {activeName ? (
              <>
                <div className="picker-details-title">{activeName}</div>
                {details.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </>
            ) : (
              <p className="section-hint">Hover or click an entry to preview it.</p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
