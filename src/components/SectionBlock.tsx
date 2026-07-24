import type { PointerEvent, ReactNode } from "react";
import type { SectionId } from "../layout";

interface Props {
  id: SectionId;
  span: 1 | 3;
  editMode: boolean;
  isDragging: boolean;
  onHandlePointerDown: (id: SectionId, e: PointerEvent) => void;
  children: ReactNode;
}

export default function SectionBlock({
  id,
  span,
  editMode,
  isDragging,
  onHandlePointerDown,
  children,
}: Props) {
  return (
    <div
      className={["sheet-block", `span-${span}`, editMode ? "edit-mode" : "", isDragging ? "dragging" : ""]
        .filter(Boolean)
        .join(" ")}
      data-section-id={id}
    >
      {editMode && (
        <div className="drag-handle" onPointerDown={(e) => onHandlePointerDown(id, e)}>
          &#8942;&#8942; Drag to reorder
        </div>
      )}
      {children}
    </div>
  );
}
