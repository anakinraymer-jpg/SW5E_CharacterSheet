export interface SectionNavItem {
  id: string;
  label: string;
}

interface Props {
  items: SectionNavItem[];
  onJump: (id: string) => void;
}

// Phone-only quick-jump bar (hidden by CSS on wider screens): the sheet is one long column on a
// phone, so this sticks to the top and scrolls to a section in one tap.
export default function SectionNav({ items, onJump }: Props) {
  return (
    <nav className="section-nav" aria-label="Jump to section">
      {items.map((item) => (
        <button key={item.id} type="button" className="section-nav-chip" onClick={() => onJump(item.id)}>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
