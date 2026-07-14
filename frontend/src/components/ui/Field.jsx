const Field = ({ label, id, className = "", ...props }) => (
  <div className={className}>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-800">
      {label}
    </label>
    <input
      id={id}
      className="w-full rounded-md border border-navy-200 px-3 py-2.5 text-navy-900 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
      {...props}
    />
  </div>
);

export default Field;
