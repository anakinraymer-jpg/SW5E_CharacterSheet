import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

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
  const [offset, setOffset] = useState(0);
  const [arrowLeft, setArrowLeft] = useState(14);

  useLayoutEffect(() => {
    if (!open || !wrapRef.current || !panelRef.current) return;
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const panelRect = panelRef.current.getBoundingClientRect();
    const margin = 12;
    let shift = 0;
    const rightEdge = wrapRect.left + panelRect.width;
    if (rightEdge > window.innerWidth - margin) {
      shift = window.innerWidth - margin - rightEdge;
    }
    if (wrapRect.left + shift < margin) {
      shift = margin - wrapRect.left;
    }
    setOffset(shift);
    setArrowLeft(Math.min(Math.max(14, -shift + 14), panelRect.width - 24));
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
      {open && (
        <span
          ref={panelRef}
          className="hover-info-panel"
          role="tooltip"
          style={{ transform: `translateX(${offset}px)`, ["--arrow-left" as string]: `${arrowLeft}px` }}
        >
          {title && <span className="hover-info-title">{title}</span>}
          {lines.map((line, i) => (
            <span key={i} className="hover-info-line" style={{ animationDelay: `${i * 70}ms` }}>
              {line}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
