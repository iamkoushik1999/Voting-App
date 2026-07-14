import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../api/axios";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { PageSpinner } from "../../components/ui/Spinner";

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/messages/all")
      .then(({ data }) => setMessages(data.messages))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <p className="mb-6 text-navy-500">Messages submitted through the Contact Us page.</p>

      {error && <Alert type="error" className="mb-4">{error}</Alert>}

      {loading ? (
        <PageSpinner />
      ) : messages.length === 0 ? (
        <Card className="p-8 text-center text-sm text-navy-500">No messages yet.</Card>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <Card key={m._id} className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-navy-900">{m.subject}</h3>
                <span className="text-xs text-navy-400">{formatDate(m.createdAt)}</span>
              </div>
              <p className="mt-1 text-xs text-navy-500">
                {m.name} &middot; {m.email}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">{m.message}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
