function SubField({
  labelClassName,
  htmlFor,
  inputClassName,
  inputId,
  text,
  placeholder,
  value,
  type,
  onChange,
  LabelClassName,
  forName,
}) {
  const resolvedLabelClassName = labelClassName || LabelClassName;
  const resolvedFor = htmlFor || forName;

  return (
    <>
      <label htmlFor={resolvedFor} className={resolvedLabelClassName}>
        {text}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        className={inputClassName}
        id={inputId}
        autoComplete="off"
        required
      />
    </>
  );
}

export default SubField;
