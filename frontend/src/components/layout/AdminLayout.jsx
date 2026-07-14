import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/candidates", label: "Candidates" },
  { to: "/admin/voters", label: "Voters" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/results", label: "Results" },
];

const AdminLayout = () => {
  const { admin, logoutAdmin } = useAuth();
  return (
    <DashboardLayout
      title="Admin Panel"
      navItems={navItems}
      onLogout={logoutAdmin}
      identityLabel={admin ? `Signed in as ${admin.adminName}` : ""}
    />
  );
};

export default AdminLayout;
