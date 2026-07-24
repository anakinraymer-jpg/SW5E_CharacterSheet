import type { ReactNode } from "react";
import type { SectionId } from "../layout";

interface Props {
  id: SectionId;
  span: 1 | 3;
  editMode: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: (id: SectionId) => void;
  onDragEnter: (id: SectionId) => void;
  onDragEnd: () => void;
  children: ReactNode;
}

export default function SectionBlock({
  id,
  span,
  editMode,
  isDragging,
  isDragOver,
  onDragStart,
  onDragEnter,
  onDragEnd,
  children,
}: Props) {
  return (
    <div
      className={[
        "sheet-block",
        `span-${span}`,
        editMode ? "edit-mode" : "",
        isDragging ? "dragging" : "",
        isDragOver ? "drag-over" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      draggable={editMode}
      onDragStart={() => onDragStart(id)}
      onDragEnter={() => onDragEnter(id)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
    >
      {editMode && <div className="drag-handle">&#8942;&#8942; Drag to reorder</div>}
      {children}
    </div>
  );
}
