import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import api, { getErrorMessage } from "../../api/axios";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Field from "../../components/ui/Field";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Alert from "../../components/ui/Alert";
import { PageSpinner } from "../../components/ui/Spinner";

const AdminCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ candidateName: "", candidatePartyName: "" });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [pendingAdd, setPendingAdd] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/candidate/all");
      setCandidates(data.allCandidates);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setPendingAdd({ ...form });
  };

  const confirmAdd = async () => {
    setFormError("");
    setSubmitting(true);
    try {
      await api.post("/candidate/add", pendingAdd);
      setForm({ candidateName: "", candidatePartyName: "" });
      setPendingAdd(null);
      setShowAdd(false);
      load();
    } catch (err) {
      setFormError(getErrorMessage(err));
      setPendingAdd(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/candidate/delete/${pendingDelete._id}`);
      setPendingDelete(null);
      load();
    } catch (err) {
      setError(getErrorMessage(err));
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-navy-500">Candidates standing in this election.</p>
        <Button onClick={() => setShowAdd(true)}>
          <FaPlus size={13} /> Add Candidate
        </Button>
      </div>

      {error && <Alert type="error" className="mb-4">{error}</Alert>}

      <Card className="overflow-hidden">
        {loading ? (
          <PageSpinner />
        ) : candidates.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-500">No candidates added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50 text-xs uppercase tracking-wide text-navy-500">
                <tr>
                  <th className="px-5 py-3">Candidate</th>
                  <th className="px-5 py-3">Party</th>
                  <th className="px-5 py-3">Votes</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {candidates.map((c) => (
                  <tr key={c._id}>
                    <td className="px-5 py-3.5 font-medium text-navy-900">{c.candidateName}</td>
                    <td className="px-5 py-3.5 text-navy-600">{c.candidatePartyName}</td>
                    <td className="px-5 py-3.5 text-navy-600">{c.voteCount}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setPendingDelete(c)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        <FaTrash size={12} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {showAdd && (
        <Modal title="Add Candidate" onClose={() => setShowAdd(false)}>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            {formError && <Alert type="error">{formError}</Alert>}
            <Field
              id="candidateName"
              label="Candidate name"
              required
              value={form.candidateName}
              onChange={(e) => setForm((f) => ({ ...f, candidateName: e.target.value }))}
            />
            <Field
              id="candidatePartyName"
              label="Party name"
              required
              value={form.candidatePartyName}
              onChange={(e) => setForm((f) => ({ ...f, candidatePartyName: e.target.value }))}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Adding..." : "Add Candidate"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {pendingAdd && (
        <ConfirmDialog
          title="Add this candidate?"
          message={`Add "${pendingAdd.candidateName}" (${pendingAdd.candidatePartyName}) to the election?`}
          onConfirm={confirmAdd}
          onCancel={() => setPendingAdd(null)}
          busy={submitting}
          confirmLabel="Add Candidate"
          busyLabel="Adding..."
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete candidate?"
          message={`This will permanently remove "${pendingDelete.candidateName}" and their vote count.`}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
          busy={deleting}
          confirmLabel="Delete"
          confirmVariant="danger"
          busyLabel="Deleting..."
        />
      )}
    </div>
  );
};

export default AdminCandidates;
