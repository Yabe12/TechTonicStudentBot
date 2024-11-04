import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

type Student = {
  number: number;
  idNumber: string;
  fullName: string;
  attendance: boolean; // true for Present, false for Absent
};

const EditStudent: React.FC<{ student: Student; onSave: (updatedStudent: Student) => void; onCancel: () => void }> = ({ student, onSave, onCancel }) => {
  const [editedStudent, setEditedStudent] = useState(student);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto text-gray-800">
      <h3 className="text-2xl font-bold mb-4">Edit Student</h3>
      <form onSubmit={(e) => { e.preventDefault(); onSave(editedStudent); }}>
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={editedStudent.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
};

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { number: 1, idNumber: "S1001", fullName: "John Doe", attendance: true },
    { number: 2, idNumber: "S1002", fullName: "Jane Smith", attendance: false },
    { number: 3, idNumber: "S1003", fullName: "Alice Johnson", attendance: true },
  ]);

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleSave = (updatedStudent: Student) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.idNumber === updatedStudent.idNumber ? updatedStudent : student
      )
    );
    setEditingStudent(null);
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
  };

  const handleAction = (action: 'delete' | 'save', id: string) => {
    if (action === 'delete') {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.idNumber !== id)
      );
    } else {
      console.log(`${action} action triggered for student with ID: ${id}`);
    }
  };

  const toggleAttendance = (id: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.idNumber === id ? { ...student, attendance: !student.attendance } : student
      )
    );
  };

  if (editingStudent) {
    return <EditStudent student={editingStudent} onSave={handleSave} onCancel={() => setEditingStudent(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-blue-900 to-gray-300 text-white p-6">
      <h2 className="text-4xl font-bold mb-4">Students Page</h2>
      <p className="text-lg mb-6">This page displays the list of students and their attendance status.</p>

      <table className="min-w-full max-w-4xl border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border px-6 py-3 font-semibold">Number</th>
            <th className="border px-6 py-3 font-semibold">ID Number</th>
            <th className="border px-6 py-3 font-semibold">Full Name</th>
            <th className="border px-6 py-3 font-semibold">Attendance</th>
            <th className="border px-6 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.idNumber} className="text-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <td className="border px-6 py-4 text-gray-800">{student.number}</td>
              <td className="border px-6 py-4 text-gray-800">{student.idNumber}</td>
              <td className="border px-6 py-4 text-gray-800">{student.fullName}</td>
              <td className="border px-6 py-4">
                <button
                  onClick={() => toggleAttendance(student.idNumber)}
                  className={`px-4 py-2 rounded ${student.attendance ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
                >
                  {student.attendance ? "Present" : "Absent"}
                </button>
              </td>
              <td className="border px-6 py-4 flex justify-center gap-3">
                <button
                  onClick={() => handleEditClick(student)}
                  className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleAction("delete", student.idNumber)}
                  className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition duration-200"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleAction("save", student.idNumber)}
                  className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition duration-200"
                >
                  <FaSave />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
