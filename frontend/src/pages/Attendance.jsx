import { useEffect, useState } from "react";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState("");
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

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
  }, []);

  const addAttendance = (event) => {
    event.preventDefault();

    // Attendance validation
    if (
      Number(attendedClasses) >
      Number(totalClasses)
    ) {
      alert(
        "Attended classes cannot be greater than total classes."
      );
      return;
    }

    const attendanceData = {
      student: Number(student),
      total_classes: Number(totalClasses),
      attended_classes: Number(attendedClasses),
    };

    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/attendance/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(attendanceData),
    })
      .then((response) => response.json())
      .then((newAttendance) => {
        console.log("New Attendance:", newAttendance);

        setAttendance([...attendance, newAttendance]);

        setStudent("");
        setTotalClasses("");
        setAttendedClasses("");
      })
      .catch((error) => {
        console.error(
          "Error adding attendance:",
          error
        );
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Student Attendance
      </h1>

      <p className="mb-6 text-gray-500">
        Add and view student attendance
      </p>

      <div className="mb-8 rounded-lg bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Add Attendance
        </h2>

        <form
          onSubmit={addAttendance}
          className="grid gap-4 md:grid-cols-2"
        >

          <select
            value={student}
            onChange={(event) =>
              setStudent(event.target.value)
            }
            className="rounded border p-3"
            required
          >
            <option value="">
              Select Student
            </option>

            {students.map((studentItem) => (
              <option
                key={studentItem.id}
                value={studentItem.id}
              >
                {studentItem.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Total Classes"
            value={totalClasses}
            onChange={(event) =>
              setTotalClasses(event.target.value)
            }
            className="rounded border p-3"
            min="1"
            required
          />

          <input
            type="number"
            placeholder="Attended Classes"
            value={attendedClasses}
            onChange={(event) =>
              setAttendedClasses(event.target.value)
            }
            className="rounded border p-3"
            min="0"
            required
          />

          <button
            type="submit"
            className="rounded bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-700"
          >
            + Add Attendance
          </button>

        </form>

      </div>

      <div className="overflow-hidden rounded-lg bg-white p-6 shadow">

        <table className="w-full text-left">

          <thead className="bg-gray-800 text-white">

            <tr>

              <th className="px-6 py-4">
                Student Name
              </th>

              <th className="px-6 py-4">
                Total Classes
              </th>

              <th className="px-6 py-4">
                Attended
              </th>

              <th className="px-6 py-4">
                Attendance %
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.map((record) => {

              const percentage =
                (record.attended_classes /
                  record.total_classes) *
                100;

              return (
                <tr
                  key={record.id}
                  className="border-b"
                >

                  <td className="px-6 py-4 font-medium">
                    {record.student_name}
                  </td>

                  <td className="px-6 py-4">
                    {record.total_classes}
                  </td>

                  <td className="px-6 py-4">
                    {record.attended_classes}
                  </td>

                  <td className="px-6 py-4 font-bold">
                    {percentage.toFixed(1)}%
                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

        {attendance.length === 0 && (
          <p className="py-6 text-center text-gray-500">
            No attendance records found.
          </p>
        )}

      </div>

    </div>
  );
}

export default Attendance;