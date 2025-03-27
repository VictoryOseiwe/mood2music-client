import "./Input.css";

export default function Input({ htmlFor, Label, ...props }) {
  return (
    <div className="input-container">
      <label className="label-for-input" htmlFor={htmlFor}>
        {Label}
      </label>
      <input className="input-field" {...props} />
    </div>
  );
}
