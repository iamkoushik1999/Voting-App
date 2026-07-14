import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/voter", label: "Dashboard", end: true },
  { to: "/voter/vote", label: "Cast Your Vote" },
  { to: "/voter/profile", label: "My Profile" },
  { to: "/results", label: "Results" },
];

const VoterLayout = () => {
  const { voter, logoutVoter } = useAuth();
  return (
    <DashboardLayout
      title="Voter Panel"
      navItems={navItems}
      onLogout={logoutVoter}
      identityLabel={voter ? `${voter.name} (${voter.voterId})` : ""}
    />
  );
};

export default VoterLayout;
