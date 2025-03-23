export default function Button({ onClick, className, children, ...props }) {
  return (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
}
