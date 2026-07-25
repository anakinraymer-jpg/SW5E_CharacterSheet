import { useEffect, useRef, useState } from "react";

export interface PowerPickerOption {
  name: string;
  level: number;
  tooltip: string[];
}

interface Props {
  value: string;
  options: PowerPickerOption[];
  onSelect: (name: string) => void;
  onTextChange: (text: string) => void;
  placeholder?: string;
  className?: string;
}

function levelGroupLabel(level: number): string {
  if (level <= 0) return "At-Will";
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  const suffix = suffixes[level] ?? "th";
  return `${level}${suffix} Level`;
}

export default function PowerNameField({
  value,
  options,
  onSelect,
  onTextChange,
  placeholder,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [activeName, setActiveName] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const query = value.trim().toLowerCase();
  const filtered = query ? options.filter((o) => o.name.toLowerCase().includes(query)) : options;

  const grouped = new Map<number, PowerPickerOption[]>();
  for (const opt of filtered) {
    const list = grouped.get(opt.level) ?? [];
    list.push(opt);
    grouped.set(opt.level, list);
  }
  const levels = [...grouped.keys()].sort((a, b) => a - b);
  for (const lvl of levels) {
    grouped.get(lvl)!.sort((a, b) => a.name.localeCompare(b.name));
  }

  const currentKnown = options.find((o) => o.name.toLowerCase() === query);
  const activeOption = options.find((o) => o.name === activeName) ?? currentKnown;

  return (
    <div
      className="power-name-field"
      ref={containerRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onTextChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setActiveName(currentKnown?.name ?? null);
          setOpen(true);
        }}
        className={className}
      />
      {open && (
        <div className="power-picker-dropdown">
          <div className="power-picker-list">
            {levels.length === 0 && <div className="power-picker-empty">No matches</div>}
            {levels.map((lvl) => (
              <div key={lvl}>
                <div className="power-picker-group-header">{levelGroupLabel(lvl)}</div>
                {grouped.get(lvl)!.map((opt) => (
                  <div
                    key={opt.name}
                    className={`power-picker-option${activeName === opt.name ? " active" : ""}`}
                    onMouseEnter={() => setActiveName(opt.name)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onSelect(opt.name);
                      setOpen(false);
                    }}
                  >
                    {opt.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {activeOption && (
            <div className="power-picker-preview">
              <span className="power-picker-preview-title">{activeOption.name}</span>
              {activeOption.tooltip.map((line, i) => (
                <span key={i} className="power-picker-preview-line">
                  {line}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {!open && hovering && currentKnown && (
        <div className="hover-info-panel power-current-tooltip">
          <span className="hover-info-title">{currentKnown.name}</span>
          {currentKnown.tooltip.map((line, i) => (
            <span key={i} className="hover-info-line">
              {line}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
