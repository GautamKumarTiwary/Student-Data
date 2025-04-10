import StudentContext from "./studentContext";
import { useState } from "react";

const StudentState = (props) => {
  const host = "http://localhost:5000";

  const studentInitial = [];

  const [students, setStudents] = useState(studentInitial);

  // 🔹 Get All Students
  const getStudents = async () => {
    const response = await fetch(`${host}/api/student/fetchall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    setStudents(json);
  };

  // 🔹 Add a Student
  const addStudent = async (studentData) => {
    const response = await fetch(`${host}/api/student/student_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth-token if needed
      },
      body: JSON.stringify(studentData),
    });
    const student = await response.json();
    setStudents(students.concat(student.student));  // Adjust based on backend response
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, getStudents }}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
