const variants = {
  primary: "bg-navy-800 text-white hover:bg-navy-700 focus-visible:outline-navy-800",
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400 focus-visible:outline-gold-600",
  outline:
    "border border-navy-300 text-navy-800 hover:bg-navy-50 focus-visible:outline-navy-800",
  danger: "bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-700",
  ghost: "text-navy-700 hover:bg-navy-50 focus-visible:outline-navy-800",
};

const Button = ({
  as: Component = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
