import type { ReactNode } from "react";
import HoverInfo from "./HoverInfo";
import Modal from "./Modal";

interface CardProps {
  title: string;
  // Tooltip shown while hovering the card.
  summary: string[];
  // Optional always-visible line under the title (e.g. the Force/Tech save DCs).
  headline?: ReactNode;
  onOpen: () => void;
}

// Simple mode's stand-in for a full section: just a title, shown at a glance on hover, and a click
// opens the whole section for editing.
export function SimpleCard({ title, summary, headline, onOpen }: CardProps) {
  return (
    <section className="sheet-section simple-card">
      <HoverInfo title={title} lines={summary} className="simple-card-hover">
        <button type="button" className="simple-card-button" onClick={onOpen}>
          <span className="simple-card-title">{title}</span>
          {headline && <span className="simple-card-headline">{headline}</span>}
          <span className="simple-card-open" aria-hidden="true">
            ▸
          </span>
        </button>
      </HoverInfo>
    </section>
  );
}

export function SimpleModal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <Modal title={title} onClose={onClose} className="simple-modal">
      {children}
    </Modal>
  );
}
