import React from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const Students: React.FC = () => {
  // Sample data
  const students = [
    { number: 1, idNumber: "S1001", fullName: "John Doe", status: "Accepted" },
    { number: 2, idNumber: "S1002", fullName: "Jane Smith", status: "Rejected" },
    { number: 3, idNumber: "S1003", fullName: "Alice Johnson", status: "Accepted" },
  ];

  // Function to handle action events
  const handleAction = (action: 'edit' | 'delete' | 'save', id: string) => {
    console.log(`${action} action triggered for student with ID: ${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Students Page</h2>
      <p>This page will display the list of students.</p>
      <table className="min-w-full border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Number</th>
            <th className="border px-4 py-2">ID Number</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.idNumber} className="text-center">
              <td className="border px-4 py-2">{student.number}</td>
              <td className="border px-4 py-2">{student.idNumber}</td>
              <td className="border px-4 py-2">{student.fullName}</td>
              <td
                className={`border px-4 py-2 ${
                  student.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {student.status}
              </td>
              <td className="border px-4 py-2 flex justify-center gap-4">
                <button onClick={() => handleAction("edit", student.idNumber)}>
                  <FaEdit className="text-blue-500" />
                </button>
                <button onClick={() => handleAction("delete", student.idNumber)}>
                  <FaTrash className="text-red-500" />
                </button>
                <button onClick={() => handleAction("save", student.idNumber)}>
                  <FaSave className="text-green-500" />
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
