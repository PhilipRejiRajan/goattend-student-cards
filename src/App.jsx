import { useState, useEffect } from "react";
import { getStudents, deleteStudent } from "./api";
import StudentCard from "./components/StudentCard";
import AddModal from "./components/AddModal";
import ViewModal from "./components/ViewModal";
import EditModal from "./components/EditModal";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleStudentAdded = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Delete this student record?");
    if (!confirmed) return;

    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete student", err);
    }
  };

  const handleEditFromView = (student) => {
    setViewingStudent(null);
    setEditingStudent(student);
  };

  return (
    <div className="min-h-screen bg-bg font-body text-ink">
      <header className="sticky top-0 bg-bg border-b-2 border-line z-10">
        <div className="max-w-5xl mx-auto px-4 h-[84px] flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-display text-2xl">
            <span className="w-[34px] h-[34px] rounded-lg bg-accent flex items-center justify-center text-bg font-display text-lg">
              G
            </span>
            GoAttend
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-accent text-bg border-2 border-line rounded-lg px-4 py-2.5 text-sm font-semibold font-body hover:-translate-y-0.5 transition-transform"
          >
            + Add Student
          </button>
        </div>
      </header>
 
      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-ink-soft font-body py-16">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-ink-soft font-body py-16">
            No students added yet. Click "+ Add Student" to add your first record.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onView={setViewingStudent}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <AddModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onStudentAdded={handleStudentAdded}
      />

      <ViewModal
        student={viewingStudent}
        onClose={() => setViewingStudent(null)}
        onEdit={handleEditFromView}
      />

      <EditModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onStudentUpdated={handleStudentUpdated}
      />
    </div>
  );
}