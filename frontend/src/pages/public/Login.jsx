import { useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { FaUserShield, FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Field from "../../components/ui/Field";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getErrorMessage } from "../../api/axios";

const Login = () => {
  const { admin, voter, loading, loginAdmin, loginVoter } = useAuth();
  const [tab, setTab] = useState("voter");
  const [adminForm, setAdminForm] = useState({ adminName: "", adminPassword: "" });
  const [voterForm, setVoterForm] = useState({ voterId: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!loading && admin) return <Navigate to="/admin" replace />;
  if (!loading && voter) return <Navigate to="/voter" replace />;

  const from = location.state?.from;

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await loginAdmin(adminForm.adminName, adminForm.adminPassword);
      navigate(from || "/admin", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleVoterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await loginVoter(voterForm.voterId, voterForm.password);
      navigate(from || "/voter", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-14">
      <h1 className="text-center font-heading text-3xl font-bold text-navy-900">Welcome back</h1>
      <p className="mt-2 text-center text-sm text-navy-500">Sign in to continue to your dashboard.</p>

      <div className="mt-8 grid grid-cols-2 rounded-lg border border-navy-100 bg-navy-50 p-1">
        <button
          type="button"
          onClick={() => {
            setTab("voter");
            setError("");
          }}
          className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors ${
            tab === "voter" ? "bg-white text-navy-900 shadow-sm" : "text-navy-500"
          }`}
        >
          <FaUserAlt size={13} /> Voter
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("admin");
            setError("");
          }}
          className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors ${
            tab === "admin" ? "bg-white text-navy-900 shadow-sm" : "text-navy-500"
          }`}
        >
          <FaUserShield size={13} /> Admin
        </button>
      </div>

      {error && (
        <Alert type="error" className="mt-5">
          {error}
        </Alert>
      )}

      {tab === "voter" ? (
        <form onSubmit={handleVoterSubmit} className="mt-6 space-y-4">
          <Field
            id="voterId"
            label="Voter ID"
            required
            autoComplete="username"
            placeholder="V-000123"
            value={voterForm.voterId}
            onChange={(e) => setVoterForm((f) => ({ ...f, voterId: e.target.value }))}
          />
          <Field
            id="voterPassword"
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            value={voterForm.password}
            onChange={(e) => setVoterForm((f) => ({ ...f, password: e.target.value }))}
          />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in as Voter"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleAdminSubmit} className="mt-6 space-y-4">
          <Field
            id="adminName"
            label="Admin username"
            required
            autoComplete="username"
            value={adminForm.adminName}
            onChange={(e) => setAdminForm((f) => ({ ...f, adminName: e.target.value }))}
          />
          <Field
            id="adminPassword"
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            value={adminForm.adminPassword}
            onChange={(e) => setAdminForm((f) => ({ ...f, adminPassword: e.target.value }))}
          />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in as Admin"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-xs text-navy-400">
        Don't have credentials? Voter and admin accounts are issued by the election
        administrator — see the FAQ for details.
      </p>
    </div>
  );
};

export default Login;
