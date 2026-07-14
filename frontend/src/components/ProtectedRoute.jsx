import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageSpinner } from "./ui/Spinner";

const ProtectedRoute = ({ role }) => {
  const { admin, voter, loading } = useAuth();

  if (loading) return <PageSpinner />;

  const identity = role === "admin" ? admin : role === "voter" ? voter : admin || voter;
  if (!identity) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
