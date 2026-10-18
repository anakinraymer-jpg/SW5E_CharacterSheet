import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  title?: string;
  lines: string[];
  children: ReactNode;
  className?: string;
  // Skip the tooltip on touch screens (the child handles taps itself and shows its own summary).
  disableOnTouch?: boolean;
}

// Touch screens have no hover, so tooltips open on tap there and close on the next tap elsewhere.
const IS_TOUCH = typeof window !== "undefined" && !!window.matchMedia?.("(hover: none)").matches;

const TYPE_TICK_MS = 16;
const TYPE_MAX_TICKS = 90; // caps total typing duration regardless of text length

export default function HoverInfo({ title, lines, children, className, disableOnTouch }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [arrowLeft, setArrowLeft] = useState(14);
  const [placement, setPlacement] = useState<"below" | "above">("below");
  const [typedCount, setTypedCount] = useState(0);

  const segments = title ? [title, ...lines] : lines;
  const totalChars = segments.reduce((sum, s) => sum + s.length, 0);

  useEffect(() => {
    if (!open) {
      setTypedCount(0);
      return;
    }
    if (totalChars === 0) return;
    if (IS_TOUCH) {
      setTypedCount(totalChars);
      return;
    }
    const charsPerTick = Math.max(1, Math.ceil(totalChars / TYPE_MAX_TICKS));
    const id = setInterval(() => {
      setTypedCount((prev) => {
        const next = prev + charsPerTick;
        if (next >= totalChars) {
          clearInterval(id);
          return totalChars;
        }
        return next;
      });
    }, TYPE_TICK_MS);
    return () => clearInterval(id);
  }, [open, totalChars]);

  useLayoutEffect(() => {
    if (!open || !wrapRef.current || !panelRef.current) return;
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const panelRect = panelRef.current.getBoundingClientRect();
    const margin = 12;
    const gap = 10;

    let left = wrapRect.left;
    if (left + panelRect.width > window.innerWidth - margin) {
      left = window.innerWidth - margin - panelRect.width;
    }
    if (left < margin) left = margin;

    let top = wrapRect.bottom + gap;
    let nextPlacement: "below" | "above" = "below";
    if (top + panelRect.height > window.innerHeight - margin) {
      const aboveTop = wrapRect.top - gap - panelRect.height;
      if (aboveTop >= margin) {
        top = aboveTop;
        nextPlacement = "above";
      } else {
        top = Math.max(margin, window.innerHeight - margin - panelRect.height);
      }
    }

    setPos({ top, left });
    setArrowLeft(Math.min(Math.max(14, wrapRect.left - left + 14), panelRect.width - 24));
    setPlacement(nextPlacement);
  }, [open]);

  useEffect(() => {
    if (!IS_TOUCH || !open) return;
    const close = () => setOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  const handlers = IS_TOUCH
    ? {
        onClick: (e: ReactMouseEvent) => {
          if (disableOnTouch) return;
          // Tapping a field is for typing; a tooltip over it would fight the on-screen keyboard.
          if ((e.target as HTMLElement).closest("input, textarea, select")) return;
          setOpen((o) => !o);
        },
      }
    : {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onFocus: () => setOpen(true),
        onBlur: () => setOpen(false),
      };

  return (
    <span ref={wrapRef} className={`hover-info${className ? ` ${className}` : ""}`} {...handlers}>
      {children}
      {open &&
        createPortal(
          <span
            ref={panelRef}
            className={`hover-info-panel hover-info-panel-${placement}`}
            role="tooltip"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              ["--arrow-left" as string]: `${arrowLeft}px`,
            }}
          >
            {(() => {
              let offset = 0;
              let cursorPlaced = false;
              const renderSegment = (text: string, key: string | number, cls: string) => {
                const start = offset;
                offset += text.length;
                const shown = Math.max(0, Math.min(text.length, typedCount - start));
                const showCursor =
                  !cursorPlaced && typedCount < totalChars && typedCount >= start && typedCount < start + text.length;
                if (showCursor) cursorPlaced = true;
                return (
                  <span key={key} className={cls}>
                    {text.slice(0, shown)}
                    {showCursor && <span className="hover-info-cursor" />}
                    <span className="hover-info-hidden-text">{text.slice(shown)}</span>
                  </span>
                );
              };
              return (
                <>
                  {title && renderSegment(title, "title", "hover-info-title")}
                  {lines.map((line, i) => renderSegment(line, i, "hover-info-line"))}
                </>
              );
            })()}
          </span>,
          document.body
        )}
    </span>
  );
}
