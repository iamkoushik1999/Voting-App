import { Link } from "react-router-dom";
import { FaVoteYea, FaUserCircle, FaChartBar, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";

const links = [
  { to: "/voter/vote", label: "Cast Your Vote", body: "Review candidates and submit your ballot.", icon: FaVoteYea },
  { to: "/voter/profile", label: "My Profile", body: "View your registered voter details.", icon: FaUserCircle },
  { to: "/results", label: "Election Results", body: "See the live vote tally.", icon: FaChartBar },
];

const VoterDashboard = () => {
  const { voter } = useAuth();

  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-navy-900">Welcome, {voter?.name}</h2>
      <p className="mt-1 text-navy-500">Voter ID: {voter?.voterId}</p>

      {voter?.isVoted ? (
        <Alert type="success" className="mt-5 flex items-center gap-2">
          <FaCheckCircle /> You have already cast your vote in this election. Thank you for
          participating.
        </Alert>
      ) : (
        <Alert type="warning" className="mt-5">
          You haven't voted yet. Head to "Cast Your Vote" when you're ready &mdash; it can only be
          done once.
        </Alert>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <Card key={link.to} className="p-5">
            <link.icon className="mb-3 text-gold-500" size={22} />
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

export default VoterDashboard;
