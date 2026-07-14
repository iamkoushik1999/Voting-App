import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaCopy } from "react-icons/fa";
import api, { getErrorMessage } from "../../api/axios";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Field from "../../components/ui/Field";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Alert from "../../components/ui/Alert";
import { PageSpinner } from "../../components/ui/Spinner";

const emptyForm = { name: "", mobile: "", password: "" };

const AdminVoters = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [newCredentials, setNewCredentials] = useState(null);
  const [pendingAdd, setPendingAdd] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/voter/all");
      setVoters(data.allVoters);
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
      const { data } = await api.post("/voter/add", pendingAdd);
      setForm(emptyForm);
      setPendingAdd(null);
      setShowAdd(false);
      setNewCredentials({ voterId: data.voter.voterId, password: data.generatedPassword, name: data.voter.name });
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
      await api.delete(`/voter/delete/${pendingDelete._id}`);
      setPendingDelete(null);
      load();
    } catch (err) {
      setError(getErrorMessage(err));
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const copyCredentials = () => {
    navigator.clipboard.writeText(`Voter ID: ${newCredentials.voterId}\nPassword: ${newCredentials.password}`);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-navy-500">Voters registered for this election.</p>
        <Button onClick={() => setShowAdd(true)}>
          <FaPlus size={13} /> Add Voter
        </Button>
      </div>

      {error && <Alert type="error" className="mb-4">{error}</Alert>}

      <Card className="overflow-hidden">
        {loading ? (
          <PageSpinner />
        ) : voters.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-500">No voters registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50 text-xs uppercase tracking-wide text-navy-500">
                <tr>
                  <th className="px-5 py-3">Voter ID</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Mobile</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {voters.map((v) => (
                  <tr key={v._id}>
                    <td className="px-5 py-3.5 font-mono text-xs font-medium text-navy-900">{v.voterId}</td>
                    <td className="px-5 py-3.5 text-navy-900">{v.name}</td>
                    <td className="px-5 py-3.5 text-navy-600">{v.mobile}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          v.isVoted ? "bg-green-100 text-green-800" : "bg-navy-100 text-navy-600"
                        }`}
                      >
                        {v.isVoted ? "Voted" : "Not voted"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setPendingDelete(v)}
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
        <Modal title="Add Voter" onClose={() => setShowAdd(false)}>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            {formError && <Alert type="error">{formError}</Alert>}
            <Field
              id="voterName"
              label="Voter name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <Field
              id="voterMobile"
              label="Mobile number"
              required
              value={form.mobile}
              onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
            />
            <Field
              id="voterPassword"
              label="Initial password"
              type="text"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="At least 8 characters"
            />
            <p className="text-xs text-navy-400">
              A Voter ID will be generated automatically. Share both with the voter directly &mdash;
              this password can't be recovered later.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Adding..." : "Add Voter"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {newCredentials && (
        <Modal title="Voter added" onClose={() => setNewCredentials(null)}>
          <p className="mb-4 text-sm text-navy-600">
            Share these credentials with <strong>{newCredentials.name}</strong>. This password is
            shown only once and cannot be retrieved again.
          </p>
          <div className="space-y-2 rounded-md bg-navy-50 p-4 font-mono text-sm">
            <p>
              <span className="text-navy-400">Voter ID:</span> {newCredentials.voterId}
            </p>
            <p>
              <span className="text-navy-400">Password:</span> {newCredentials.password}
            </p>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={copyCredentials}>
              <FaCopy size={13} /> Copy
            </Button>
            <Button onClick={() => setNewCredentials(null)}>Done</Button>
          </div>
        </Modal>
      )}

      {pendingAdd && (
        <ConfirmDialog
          title="Add this voter?"
          message={`Register "${pendingAdd.name}" (${pendingAdd.mobile}) as a voter and generate their login credentials?`}
          onConfirm={confirmAdd}
          onCancel={() => setPendingAdd(null)}
          busy={submitting}
          confirmLabel="Add Voter"
          busyLabel="Adding..."
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete voter?"
          message={`This will permanently remove "${pendingDelete.name}" (${pendingDelete.voterId}).`}
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

export default AdminVoters;
