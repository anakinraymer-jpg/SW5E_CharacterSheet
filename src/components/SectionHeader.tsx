interface Props {
  title: string;
  collapsed: boolean;
  onToggle: () => void;
}

export default function SectionHeader({ title, collapsed, onToggle }: Props) {
  return (
    <h2
      className="collapsible-header"
      role="button"
      tabIndex={0}
      aria-expanded={!collapsed}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {title}
      <span className={`collapse-chevron${collapsed ? " is-collapsed" : ""}`} aria-hidden="true">
        &#9662;
      </span>
    </h2>
  );
}
