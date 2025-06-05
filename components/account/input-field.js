export default function InputField({
  id,
  name,
  label,
  onFocus,
  type = "text",
}) {
  return (
    <>
      <label className="text-primary text-opacity-50" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        aria-required="true"
        aria-label={label}
        type={type}
        name={name}
        className="mb-5 w-full border bg-white px-5 py-3 outline-none"
        required
        onFocus={onFocus}
      />
    </>
  );
}
