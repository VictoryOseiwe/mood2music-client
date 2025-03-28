import "./Input.css";

export default function Input({ htmlFor, Label, ...props }) {
  return (
    <div className="input-container">
      <label htmlFor={htmlFor} className="label-for-input">
        {Label}
      </label>
      <input
        id={htmlFor}
        autoComplete="true"
        className="input-field"
        {...props}
      />
    </div>
  );
}
