
export default function ViewModal({ student, onClose, onEdit }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-ink/45 flex items-center justify-center z-50 px-4">
      <div className="bg-card border-2 border-line rounded-card w-full max-w-md p-8 text-center">

        <h3 className="font-display text-xl text-ink mb-4">{student.name}</h3>

        <div className="text-left text-sm space-y-1.5 text-ink font-body">
          <p><strong className="font-semibold">Email:</strong> {student.email}</p>
          <p><strong className="font-semibold">Phone:</strong> {student.phone}</p>
          <p><strong className="font-semibold">Date of Birth:</strong> {student.dob}</p>
          <p><strong className="font-semibold">Department:</strong> {student.department}</p>
          <p><strong className="font-semibold">Programme:</strong> {student.programme}</p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2.5 rounded-lg border-2 border-line bg-bg text-ink text-sm font-semibold font-body hover:-translate-y-0.5 transition-transform">
            Close
          </button>
          <button onClick={() => onEdit(student)} className="px-4 py-2.5 rounded-lg border-2 border-line bg-accent text-bg text-sm font-semibold font-body hover:-translate-y-0.5 transition-transform">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}