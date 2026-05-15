import { useState } from "react";
import { C } from "../styles/theme";

export default function FormField({
  label,
  placeholder,
  interactiveProps,
  style: sty,
}) {
  const [foc, setFoc] = useState(false);

  // derive a safe field name from the label, e.g. "First Name" -> "firstName"
  const fieldName = label
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "");

  // pull value and onChange from interactiveProps.values or interactiveProps.form.values
  const valuesSource = (interactiveProps && (interactiveProps.values || (interactiveProps.form && interactiveProps.form.values))) || undefined;
  const value = valuesSource ? valuesSource[fieldName] ?? "" : undefined;
  const onChange =
    (interactiveProps && (interactiveProps.onChange || (interactiveProps.form && interactiveProps.form.onChange))) || undefined;

  const restProps = interactiveProps ? { ...interactiveProps } : {};
  if (restProps.values) delete restProps.values;
  if (restProps.onChange) delete restProps.onChange;
  if (restProps.form) delete restProps.form;

  const st = {
    label: {
      fontSize: 12,
      color: C.muted,
      display: "block",
      marginBottom: 6,
      fontWeight: 500,
    },
    input: {
      width: "100%",
      background: "rgba(255,255,255,.04)",
      border: `1px solid ${foc ? C.accent : C.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      color: C.text,
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
      boxShadow: foc ? `0 0 0 3px ${C.accentDim}` : "none",
      transition: "border-color .2s, box-shadow .2s",
    },
  };

  return (
    <div style={sty}>
      <label style={st.label}>{label}</label>
      <input
        placeholder={placeholder}
        onFocus={() => setFoc(true)}
        onBlur={() => setFoc(false)}
        name={fieldName}
        value={value}
        onChange={onChange}
        {...restProps}
        style={st.input}
      />
    </div>
  );
}
