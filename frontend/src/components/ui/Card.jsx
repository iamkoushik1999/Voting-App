const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-xl border border-navy-100 bg-white shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
