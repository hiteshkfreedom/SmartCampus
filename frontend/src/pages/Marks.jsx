import { useEffect, useState } from "react";

function Marks() {
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [mark, setMark] = useState("");
  const [totalMarks, setTotalMarks] = useState("100");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

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
        console.error("Error fetching marks:", error);
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
        console.error("Error fetching students:", error);
      });
  }, []);

  const addMark = (event) => {
    event.preventDefault();

    const markData = {
      student: Number(student),
      subject: subject,
      marks: Number(mark),
      total_marks: Number(totalMarks),
    };

    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/marks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(markData),
    })
      .then(async (response) => {
        const data = await response.json();

        console.log("Server response:", data);

        if (!response.ok) {
          const errorMessage =
            data.marks?.[0] ||
            data.detail ||
            data.non_field_errors?.[0] ||
            data[0] ||
            "Invalid marks data.";

          throw new Error(errorMessage);
        }

        return data;
      })
      .then((newMark) => {
        setMarks((previousMarks) => [
          ...previousMarks,
          newMark,
        ]);

        setStudent("");
        setSubject("");
        setMark("");
        setTotalMarks("100");
      })
      .catch((error) => {
        alert(error.message);

        console.error("Error adding mark:", error);
      });
  };

  const getGrade = (marks, totalMarks) => {
    const percentage = (marks / totalMarks) * 100;

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
        Student Performance
      </h1>

      <p className="mb-6 text-gray-500">
        Add and view student marks
      </p>

      {/* Add Mark Form */}

      <div className="mb-8 rounded-lg bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Add Mark
        </h2>

        <form
          onSubmit={addMark}
          className="grid gap-4 md:grid-cols-2"
        >

          {/* Student */}

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

          {/* Subject */}

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(event) =>
              setSubject(event.target.value)
            }
            className="rounded border p-3"
            required
          />

          {/* Marks */}

          <input
            type="number"
            placeholder="Marks"
            value={mark}
            onChange={(event) =>
              setMark(event.target.value)
            }
            className="rounded border p-3"
            min="0"
            required
          />

          {/* Total Marks */}

          <input
            type="number"
            placeholder="Total Marks"
            value={totalMarks}
            onChange={(event) =>
              setTotalMarks(event.target.value)
            }
            className="rounded border p-3"
            min="1"
            required
          />

          {/* Add Mark Button */}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-700"
            >
              + Add Mark
            </button>
          </div>

        </form>

      </div>

      {/* Marks Table */}

      <div className="overflow-x-auto rounded-lg bg-white p-6 shadow">

        <table className="w-full text-left">

          <thead className="bg-gray-800 text-white">

            <tr>

              <th className="px-6 py-4">
                Student
              </th>

              <th className="px-6 py-4">
                Subject
              </th>

              <th className="px-6 py-4">
                Marks
              </th>

              <th className="px-6 py-4">
                Total Marks
              </th>

              <th className="px-6 py-4">
                Percentage
              </th>

              <th className="px-6 py-4">
                Grade
              </th>

            </tr>

          </thead>

          <tbody>

            {marks.map((record) => (

              <tr
                key={record.id}
                className="border-b"
              >

                <td className="px-6 py-4 font-medium">
                  {record.student_name}
                </td>

                <td className="px-6 py-4">
                  {record.subject}
                </td>

                <td className="px-6 py-4">
                  {record.marks}
                </td>

                <td className="px-6 py-4">
                  {record.total_marks}
                </td>

                <td className="px-6 py-4 font-semibold">
                  {(
                    (record.marks /
                      record.total_marks) *
                    100
                  ).toFixed(1)}
                  %
                </td>

                <td className="px-6 py-4 font-bold">
                  {getGrade(
                    record.marks,
                    record.total_marks
                  )}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {marks.length === 0 && (
          <p className="py-6 text-center text-gray-500">
            No marks found.
          </p>
        )}

      </div>

    </div>
  );
}

export default Marks;