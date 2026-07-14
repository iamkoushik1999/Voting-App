import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import api, { getErrorMessage } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Modal from "../../components/ui/Modal";
import { PageSpinner } from "../../components/ui/Spinner";

const VoterVote = () => {
  const { voter, setVoterHasVoted } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingVote, setPendingVote] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/candidate/all")
      .then(({ data }) => setCandidates(data.allCandidates))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const confirmVote = async () => {
    setSubmitting(true);
    setError("");
    try {
      await api.put(`/voter/vote/${pendingVote._id}`);
      setVoterHasVoted();
      setPendingVote(null);
      navigate("/voter");
    } catch (err) {
      setError(getErrorMessage(err));
      setPendingVote(null);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageSpinner />;

  if (voter?.isVoted) {
    return (
      <Alert type="success" className="flex items-center gap-2">
        <FaCheckCircle /> You've already cast your vote. Thank you for participating.
      </Alert>
    );
  }

  return (
    <div>
      <p className="mb-6 text-navy-500">
        Choose one candidate below. Your vote is final and cannot be changed once submitted.
      </p>

      {error && <Alert type="error" className="mb-4">{error}</Alert>}

      {candidates.length === 0 ? (
        <Card className="p-8 text-center text-sm text-navy-500">
          No candidates have been added to this election yet.
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {candidates.map((c) => (
            <Card key={c._id} className="flex flex-col p-5">
              <h3 className="font-heading text-lg font-bold text-navy-900">{c.candidateName}</h3>
              <p className="mt-1 text-sm text-navy-500">{c.candidatePartyName}</p>
              <Button variant="gold" className="mt-5" onClick={() => setPendingVote(c)}>
                Vote for {c.candidateName.split(" ")[0]}
              </Button>
            </Card>
          ))}
        </div>
      )}

      {pendingVote && (
        <Modal title="Confirm your vote" onClose={() => setPendingVote(null)}>
          <p className="mb-6 text-sm text-navy-600">
            You're about to vote for <strong>{pendingVote.candidateName}</strong> (
            {pendingVote.candidatePartyName}). This cannot be undone. Continue?
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setPendingVote(null)} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="gold" onClick={confirmVote} disabled={submitting}>
              {submitting ? "Submitting..." : "Confirm Vote"}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VoterVote;
