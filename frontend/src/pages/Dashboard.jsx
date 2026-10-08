import { useEffect, useState } from "react";

function Dashboard() {
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
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
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
        if (Array.isArray(data)) {
          setMarks(data);
        } else {
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
        if (Array.isArray(data)) {
          setAttendance(data);
        } else {
          setAttendance([]);
        }
      })
      .catch((error) => {
        console.error("Attendance error:", error);
      });
  }, []);

  // Total Students
  const totalStudents = students.length;

  // Total Courses
  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  // Total Mark Records
  const totalMarkRecords = marks.length;

  // Average Marks
  // Calculate using total obtained marks / total maximum marks
  let averageMarks = 0;

  if (marks.length > 0) {
    let obtainedMarks = 0;
    let totalMarks = 0;

    marks.forEach((record) => {
      obtainedMarks += Number(record.marks);
      totalMarks += Number(record.total_marks);
    });

    if (totalMarks > 0) {
      averageMarks =
        (obtainedMarks / totalMarks) * 100;
    }
  }

  // Average Attendance
  let averageAttendance = 0;

  if (attendance.length > 0) {
    let totalAttendedClasses = 0;
    let totalClasses = 0;

    attendance.forEach((record) => {
      totalAttendedClasses += Number(
        record.attended_classes
      );

      totalClasses += Number(
        record.total_classes
      );
    });

    if (totalClasses > 0) {
      averageAttendance =
        (totalAttendedClasses / totalClasses) * 100;
    }
  }

  // Top Student
  let topStudent = "No student";

  if (marks.length > 0) {
    const studentMarks = {};

    marks.forEach((record) => {
      if (!studentMarks[record.student_name]) {
        studentMarks[record.student_name] = {
          obtained: 0,
          total: 0,
        };
      }

      studentMarks[record.student_name].obtained +=
        Number(record.marks);

      studentMarks[record.student_name].total +=
        Number(record.total_marks);
    });

    let highestAverage = 0;

    Object.keys(studentMarks).forEach(
      (studentName) => {
        const studentData =
          studentMarks[studentName];

        const average =
          studentData.total > 0
            ? (studentData.obtained /
                studentData.total) *
              100
            : 0;

        if (average > highestAverage) {
          highestAverage = average;
          topStudent = studentName;
        }
      }
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          SmartCampus Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Student Management & Performance Overview
        </p>

      </div>

      {/* Statistics Cards */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Total Students */}

        <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-gray-500">
                Total Students
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-800">
                {totalStudents}
              </p>

            </div>

            <div className="text-4xl">
              🎓
            </div>

          </div>

        </div>

        {/* Total Courses */}

        <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-gray-500">
                Total Courses
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-800">
                {totalCourses}
              </p>

            </div>

            <div className="text-4xl">
              📚
            </div>

          </div>

        </div>

        {/* Mark Records */}

        <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-gray-500">
                Mark Records
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-800">
                {totalMarkRecords}
              </p>

            </div>

            <div className="text-4xl">
              📝
            </div>

          </div>

        </div>

        {/* Average Marks */}

        <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-gray-500">
                Average Marks
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-800">
                {averageMarks.toFixed(1)}%
              </p>

            </div>

            <div className="text-4xl">
              📊
            </div>

          </div>

        </div>

        {/* Average Attendance */}

        <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-gray-500">
                Average Attendance
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-800">
                {averageAttendance.toFixed(1)}%
              </p>

            </div>

            <div className="text-4xl">
              📅
            </div>

          </div>

        </div>

        {/* Top Student */}

        <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-gray-500">
                Top Student
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-800">
                {topStudent}
              </p>

            </div>

            <div className="text-4xl">
              🏆
            </div>

          </div>

        </div>

      </div>

      {/* Performance Overview */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* Academic Performance */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-2 text-xl font-bold text-gray-800">
            Academic Performance
          </h2>

          <p className="mb-5 text-gray-500">
            Overall average marks
          </p>

          <div className="mb-2 flex justify-between">

            <span className="font-semibold text-gray-700">
              Performance
            </span>

            <span className="font-bold text-gray-800">
              {averageMarks.toFixed(1)}%
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-gray-800"
              style={{
                width: `${Math.min(
                  averageMarks,
                  100
                )}%`,
              }}
            ></div>

          </div>

        </div>

        {/* Attendance Performance */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-2 text-xl font-bold text-gray-800">
            Attendance Performance
          </h2>

          <p className="mb-5 text-gray-500">
            Overall student attendance
          </p>

          <div className="mb-2 flex justify-between">

            <span className="font-semibold text-gray-700">
              Attendance
            </span>

            <span className="font-bold text-gray-800">
              {averageAttendance.toFixed(1)}%
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-gray-800"
              style={{
                width: `${Math.min(
                  averageAttendance,
                  100
                )}%`,
              }}
            ></div>

          </div>

        </div>

      </div>

      {/* Student Overview */}

      <div className="mt-8 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Student Overview
        </h2>

        {students.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="p-4">
                    ID
                  </th>

                  <th className="p-4">
                    Student
                  </th>

                  <th className="p-4">
                    Course
                  </th>

                  <th className="p-4">
                    Email
                  </th>

                </tr>

              </thead>

              <tbody>

                {students.map((student) => (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {student.id}
                    </td>

                    <td className="p-4 font-semibold">
                      {student.name}
                    </td>

                    <td className="p-4">
                      {student.course}
                    </td>

                    <td className="p-4">
                      {student.email}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <p className="py-6 text-center text-gray-500">
            No students found.
          </p>

        )}

      </div>

    </div>
  );
}

export default Dashboard;