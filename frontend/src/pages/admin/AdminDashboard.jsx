import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCheck, FaVoteYea, FaChartBar, FaEnvelope } from "react-icons/fa";
import api from "../../api/axios";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import { PageSpinner } from "../../components/ui/Spinner";

const quickLinks = [
  { to: "/admin/candidates", label: "Manage Candidates", body: "Add or remove candidates standing in this election." },
  { to: "/admin/voters", label: "Manage Voters", body: "Register new voters and issue login credentials." },
  { to: "/admin/messages", label: "Contact Messages", body: "Review messages submitted through the Contact Us page." },
  { to: "/results", label: "View Results", body: "See the live vote tally across all candidates." },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/public/stats").then(({ data }) => setStats(data.stats));
  }, []);

  if (!stats) return <PageSpinner />;

  const turnout = stats.totalVoters > 0 ? Math.round((stats.totalVotesCast / stats.totalVoters) * 100) : 0;

  return (
    <div>
      <p className="mb-6 text-navy-500">A quick overview of the current election.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Registered voters" value={stats.totalVoters} icon={FaUserCheck} />
        <StatCard label="Candidates" value={stats.totalCandidates} icon={FaVoteYea} />
        <StatCard label="Votes cast" value={stats.totalVotesCast} icon={FaChartBar} accent="gold" />
        <StatCard label="Turnout" value={`${turnout}%`} icon={FaEnvelope} />
      </div>

      <h2 className="mb-4 mt-10 font-heading text-lg font-bold text-navy-900">Quick actions</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((link) => (
          <Card key={link.to} className="p-5">
            <Link to={link.to} className="font-semibold text-navy-900 hover:text-navy-700">
              {link.label}
            </Link>
            <p className="mt-1.5 text-sm text-navy-500">{link.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
