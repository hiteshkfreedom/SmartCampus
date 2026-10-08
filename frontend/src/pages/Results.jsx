import { useEffect, useState } from "react";

function Results() {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

    // Get Students
    fetch("http://127.0.0.1:8000/api/students/", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Students:", data);

        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error("Students API error:", data);
          setStudents([]);
        }
      })
      .catch((error) => {
        console.error("Students error:", error);
      });

    // Get Marks
    fetch("http://127.0.0.1:8000/api/marks/", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Marks:", data);

        if (Array.isArray(data)) {
          setMarks(data);
        } else {
          console.error("Marks API error:", data);
          setMarks([]);
        }
      })
      .catch((error) => {
        console.error("Marks error:", error);
      });

    // Get Attendance
    fetch("http://127.0.0.1:8000/api/attendance/", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Attendance:", data);

        if (Array.isArray(data)) {
          setAttendance(data);
        } else {
          console.error("Attendance API error:", data);
          setAttendance([]);
        }
      })
      .catch((error) => {
        console.error("Attendance error:", error);
      });
  }, []);

  const getGrade = (percentage) => {
    if (percentage >= 90) {
      return "A+";
    } else if (percentage >= 80) {
      return "A";
    } else if (percentage >= 70) {
      return "B";
    } else if (percentage >= 60) {
      return "C";
    } else {
      return "D";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Student Results
      </h1>

      <p className="mb-6 text-gray-500">
        View overall student performance
      </p>

      {students.map((student) => {

        const studentMarks = marks.filter(
          (record) => record.student === student.id
        );

        const studentAttendance = attendance.filter(
          (record) => record.student === student.id
        );

        let totalMarks = 0;
        let obtainedMarks = 0;

        studentMarks.forEach((record) => {
          obtainedMarks += Number(record.marks);
          totalMarks += Number(record.total_marks);
        });

        const percentage =
          totalMarks > 0
            ? (obtainedMarks / totalMarks) * 100
            : 0;

        let totalClasses = 0;
        let attendedClasses = 0;

        studentAttendance.forEach((record) => {
          totalClasses += Number(record.total_classes);
          attendedClasses += Number(record.attended_classes);
        });

        const attendancePercentage =
          totalClasses > 0
            ? (attendedClasses / totalClasses) * 100
            : 0;

        return (
          <div
            key={student.id}
            className="mb-6 rounded-lg bg-white p-6 shadow"
          >

            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              {student.name}
            </h2>

            <div className="grid gap-4 md:grid-cols-5">

              {/* Course */}

              <div>
                <p className="text-gray-500">
                  Course
                </p>

                <p className="font-semibold">
                  {student.course}
                </p>
              </div>

              {/* Marks */}

              <div>
                <p className="text-gray-500">
                  Marks
                </p>

                <p className="font-semibold">
                  {obtainedMarks} / {totalMarks}
                </p>
              </div>

              {/* Percentage */}

              <div>
                <p className="text-gray-500">
                  Percentage
                </p>

                <p className="font-semibold">
                  {percentage.toFixed(1)}%
                </p>
              </div>

              {/* Grade */}

              <div>
                <p className="text-gray-500">
                  Grade
                </p>

                <p className="font-bold">
                  {getGrade(percentage)}
                </p>
              </div>

              {/* Attendance */}

              <div>
                <p className="text-gray-500">
                  Attendance
                </p>

                <p className="font-semibold">
                  {attendancePercentage.toFixed(1)}%
                </p>
              </div>

            </div>

          </div>
        );
      })}

      {students.length === 0 && (
        <p className="text-center text-gray-500">
          No students found.
        </p>
      )}

    </div>
  );
}

export default Results;