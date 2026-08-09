
export default function ViewModal({ student, onClose, onEdit }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center">

        <h3 className="text-lg font-bold text-slate-800 mb-3">{student.name}</h3>

        <div className="text-left text-sm space-y-1.5 text-slate-700">
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Date of Birth:</strong> {student.dob}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Programme:</strong> {student.programme}</p>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700">
            Close
          </button>
          <button onClick={() => onEdit(student)} className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}