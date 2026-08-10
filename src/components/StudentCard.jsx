
export default function StudentCard({ student, onView, onDelete }) {

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(student.id);
  };

  return (
    <div
      onClick={() => onView(student)}
      className="bg-card hover:bg-card-alt transition-colors cursor-pointer rounded-card border-2 border-line p-5 flex flex-col items-center text-center"
    >
      <h3 className="font-display font-medium text-lg text-ink">{student.name}</h3>
      <p className="text-sm text-ink-soft font-body">{student.email}</p>
      <p className="text-xs text-ink-soft mt-1 font-body">{student.programme}</p>

      <button
        onClick={handleDelete}
        className="mt-4 text-sm font-semibold border-2 border-line rounded-lg px-3 py-1.5 bg-bg hover:bg-accent hover:text-bg transition-colors font-body"
      >
        Delete
      </button>
    </div>
  );
}