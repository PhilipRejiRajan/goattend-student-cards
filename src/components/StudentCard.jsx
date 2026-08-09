
export default function StudentCard({ student, onView, onDelete }) {

//   const initials = student.name
//     .split(" ")
//     .map((word) => word[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(student.id);
  };

  return (
    <div
      onClick={() => onView(student)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-5 flex flex-col items-center text-center border border-slate-100"
    >

      <h3 className="font-semibold text-slate-800">{student.name}</h3>
      <p className="text-sm text-slate-500">{student.email}</p>
      <p className="text-xs text-slate-400 mt-1">{student.programme}</p>

      <button
        onClick={handleDelete}
        className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium border border-red-200 hover:bg-red-50 rounded-lg px-3 py-1.5 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}