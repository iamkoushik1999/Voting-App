import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
  busy,
  confirmLabel = "Confirm",
  busyLabel = "Please wait...",
  confirmVariant = "primary",
}) => (
  <Modal title={title} onClose={onCancel}>
    <p className="mb-6 text-sm text-navy-600">{message}</p>
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={onCancel} disabled={busy}>
        Cancel
      </Button>
      <Button variant={confirmVariant} onClick={onConfirm} disabled={busy}>
        {busy ? busyLabel : confirmLabel}
      </Button>
    </div>
  </Modal>
);

export default ConfirmDialog;
