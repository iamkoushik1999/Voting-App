const Spinner = ({ className = "" }) => (
  <div
    className={`h-5 w-5 animate-spin rounded-full border-2 border-navy-200 border-t-navy-700 ${className}`}
    role="status"
    aria-label="Loading"
  />
);

export const PageSpinner = () => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <Spinner className="h-8 w-8" />
  </div>
);

export default Spinner;
