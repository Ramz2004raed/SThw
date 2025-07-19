import { useEffect, useState } from "react";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch students");
        return response.json();
      })
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  // Function to handle deleting a student
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" })
      .then(() => {
        // Remove the deleted student from the state
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <span>
              {" "}
              {student.name} - Age: {student.age}, Grade: {student.grade}
            </span>
            <button onClick={() => handleDelete(student.id)}>Delete</button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
