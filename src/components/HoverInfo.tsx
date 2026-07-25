import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  title?: string;
  lines: string[];
  children: ReactNode;
  className?: string;
}

export default function HoverInfo({ title, lines, children, className }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [arrowLeft, setArrowLeft] = useState(14);
  const [placement, setPlacement] = useState<"below" | "above">("below");

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

  return (
    <span
      ref={wrapRef}
      className={`hover-info${className ? ` ${className}` : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
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
            {title && <span className="hover-info-title">{title}</span>}
            {lines.map((line, i) => (
              <span key={i} className="hover-info-line" style={{ animationDelay: `${i * 70}ms` }}>
                {line}
              </span>
            ))}
          </span>,
          document.body
        )}
    </span>
  );
}
