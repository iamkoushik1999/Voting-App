const styles = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  info: "bg-navy-50 text-navy-800 border-navy-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
};

const Alert = ({ type = "info", children, className = "" }) => {
  if (!children) return null;
  return (
    <div
      role="alert"
      className={`rounded-md border px-4 py-3 text-sm ${styles[type]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Alert;
