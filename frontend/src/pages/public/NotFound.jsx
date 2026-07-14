import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const NotFound = () => (
  <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
    <p className="font-heading text-6xl font-bold text-navy-900">404</p>
    <h1 className="mt-3 font-heading text-2xl font-bold text-navy-900">Page not found</h1>
    <p className="mt-2 text-navy-500">The page you're looking for doesn't exist or has moved.</p>
    <Button as={Link} to="/" className="mt-6">
      Back to Home
    </Button>
  </div>
);

export default NotFound;
