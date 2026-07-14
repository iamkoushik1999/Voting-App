import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import api, { getErrorMessage } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import ResultsBar from "../components/ui/ResultsBar";
import Alert from "../components/ui/Alert";
import { PageSpinner } from "../components/ui/Spinner";

const ResultsPage = () => {
  const { admin, voter } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/candidate/all")
      .then(({ data }) => setCandidates(data.allCandidates))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const backTo = admin ? "/admin" : voter ? "/voter" : "/";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to={backTo} className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900">
        <IoArrowBack /> Back to dashboard
      </Link>
      <h1 className="font-heading text-2xl font-bold text-navy-900">Election Results</h1>
      <p className="mt-1 text-sm text-navy-500">Live vote counts, updated as ballots are cast.</p>

      <Card className="mt-6 p-6">
        {loading ? (
          <PageSpinner />
        ) : error ? (
          <Alert type="error">{error}</Alert>
        ) : (
          <ResultsBar candidates={candidates} />
        )}
      </Card>
    </div>
  );
};

export default ResultsPage;
