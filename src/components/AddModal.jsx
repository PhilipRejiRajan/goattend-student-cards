
import { useState } from "react";
import { createStudent } from "../api";

export default function AddModal({ open, onClose, onStudentAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
    programme: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", dob: "", department: "", programme: "" });
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, phone, dob, department, programme } = formData;

    if (!name || !email || !phone || !dob || !department || !programme) {
      setError("Please fill in every field.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      const res = await createStudent(payload);
      onStudentAdded(res.data);
      handleClose();
    } catch (err) {
      setError("Failed to add student. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/45 flex items-center justify-center z-50 px-4">
      <div className="bg-card border-2 border-line rounded-card w-full max-w-md p-8">
        <h3 className="font-display text-xl text-ink mb-4">Add Student</h3>

        <form onSubmit={handleSubmit} className="space-y-2.5">

          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} maxLength={10} />
          <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

          <Select
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={["Computer Science", "Statistics", "Management", "Commerce", "Mathematics"]}
          />
          <Select
            label="Programme"
            name="programme"
            value={formData.programme}
            onChange={handleChange}
            options={["BCA", "MCA", "B.Sc", "M.Sc", "PhD"]}
          />

          {error && <p className="text-sm text-[#a12d2d] font-body">{error}</p>}

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={handleClose} className="px-4 py-2.5 rounded-lg border-2 border-line bg-bg text-ink text-sm font-semibold font-body hover:-translate-y-0.5 transition-transform">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-4 py-2.5 rounded-lg border-2 border-line bg-accent text-bg text-sm font-semibold font-body disabled:opacity-60 hover:-translate-y-0.5 transition-transform">
              {submitting ? "Saving..." : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink-soft font-body">{label}</label>
      <input {...props} className="w-full rounded-lg border-2 border-line px-3 py-2.5 text-sm font-body bg-bg text-ink mt-1" required />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink-soft font-body">{label}</label>
      <select {...props} className="w-full rounded-lg border-2 border-line px-3 py-2.5 text-sm font-body bg-bg text-ink mt-1" required>
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}