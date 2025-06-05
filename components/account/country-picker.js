export default function CountryPicker({ countries, onFocus }) {
  return (
    <>
      <label className="text-primary text-opacity-50" htmlFor="country">
        Your country
      </label>
      <select
        id="country"
        name="country"
        required
        className="mb-5 w-full appearance-none border bg-white px-5 py-3 outline-none"
        aria-required="true"
        aria-label="Your country"
        onFocus={onFocus}
      >
        <option value="">Choose a country</option>
        {countries.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
}
