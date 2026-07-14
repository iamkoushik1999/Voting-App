import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";

const Row = ({ label, value }) => (
  <div className="flex justify-between border-b border-navy-100 py-3.5 last:border-0">
    <span className="text-sm text-navy-500">{label}</span>
    <span className="text-sm font-medium text-navy-900">{value}</span>
  </div>
);

const VoterProfile = () => {
  const { voter } = useAuth();

  return (
    <div className="max-w-lg">
      <p className="mb-6 text-navy-500">Your registered voter details (read-only).</p>
      <Card className="p-6">
        <Row label="Name" value={voter?.name} />
        <Row label="Voter ID" value={voter?.voterId} />
        <Row label="Mobile Number" value={voter?.mobile} />
        <Row label="Voting Status" value={voter?.isVoted ? "Voted" : "Not voted yet"} />
      </Card>
      <p className="mt-4 text-xs text-navy-400">
        Need to update these details? Contact your election administrator.
      </p>
    </div>
  );
};

export default VoterProfile;
