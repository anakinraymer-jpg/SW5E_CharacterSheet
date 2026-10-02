import { useState } from "react";
import PickerDialog, { type PickerOption } from "./PickerDialog";

interface Props {
  id?: string;
  title: string;
  value: string;
  placeholder?: string;
  options: PickerOption[];
  onPick: (name: string) => void;
  getDetails?: (name: string) => string[];
  allowCustom?: boolean;
  allowClear?: boolean;
}

// A field that shows its current value and opens a searchable picker menu when clicked, instead of
// the browser's inline text-box-plus-dropdown (which shared one cramped space).
export default function PickerField({
  id,
  title,
  value,
  placeholder = "Choose…",
  options,
  onPick,
  getDetails,
  allowCustom,
  allowClear = true,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" id={id} className="picker-field" onClick={() => setOpen(true)}>
        <span className={value ? "" : "picker-field-placeholder"}>{value || placeholder}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <PickerDialog
          title={title}
          options={options}
          getDetails={getDetails}
          allowCustom={allowCustom}
          actionLabel="Select"
          clearLabel={allowClear && value ? "None — clear this field" : undefined}
          onClose={() => setOpen(false)}
          onPick={(name) => {
            setOpen(false);
            onPick(name);
          }}
        />
      )}
    </>
  );
}
