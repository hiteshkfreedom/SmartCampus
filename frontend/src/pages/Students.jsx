import { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get authentication token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Get Students
  const fetchStudents = () => {
    setError("");

    fetch("http://127.0.0.1:8000/api/students/", {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Unable to load students."
          );
        }

        return data;
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          setStudents([]);
          setError("Invalid data received from server.");
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);

        setError(
          "Unable to connect to server. Please try again."
        );
      });
  };

  // Load students when page opens
  useEffect(() => {
    fetchStudents();
  }, []);

  // Add / Update Student
  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      setError(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    const studentData = {
      name: name,
      email: email,
      phone: phone,
      course: course,
    };

    const token = getToken();

    const url = editingId
      ? `http://127.0.0.1:8000/api/students/${editingId}/`
      : "http://127.0.0.1:8000/api/students/";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(studentData),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const errorMessage =
            data.email?.[0] ||
            data.phone?.[0] ||
            data.detail ||
            data[0] ||
            "Unable to save student.";

          throw new Error(errorMessage);
        }

        return data;
      })
      .then(() => {
        if (editingId) {
          setSuccess("Student updated successfully.");
        } else {
          setSuccess("Student added successfully.");
        }

        fetchStudents();
        clearForm();
      })
      .catch((error) => {
        console.error("Error saving student:", error);

        setError(
          error.message ||
          "Unable to connect to server. Please try again."
        );
      });
  };

  // View Student
  const handleView = (student) => {
    setSelectedStudent(student);

    setError("");
    setSuccess("");
  };

  // Edit Student
  const handleEdit = (student) => {
    setEditingId(student.id);

    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
    setCourse(student.course);

    setSelectedStudent(null);

    setError("");
    setSuccess("");
  };

  // Delete Student
  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this student?"
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    fetch(
      `http://127.0.0.1:8000/api/students/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          let data = {};

          try {
            data = await response.json();
          } catch {
            data = {};
          }

          throw new Error(
            data.detail || "Unable to delete student."
          );
        }
      })
      .then(() => {
        setSuccess("Student deleted successfully.");

        if (
          selectedStudent &&
          selectedStudent.id === id
        ) {
          setSelectedStudent(null);
        }

        fetchStudents();
      })
      .catch((error) => {
        console.error("Error deleting student:", error);

        setError(
          error.message ||
          "Unable to connect to server. Please try again."
        );
      });
  };

  // Clear Form
  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCourse("");
    setEditingId(null);
  };

  // Search Students
  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Page Title */}

      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Student Management
      </h1>

      {/* Error Message */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-100 p-4 font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Success Message */}

      {success && (
        <div className="mb-6 rounded-lg border border-green-300 bg-green-100 p-4 font-semibold text-green-700">
          {success}
        </div>
      )}

      {/* Student Details */}

      {selectedStudent && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-gray-800">
              Student Details
            </h2>

            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="rounded bg-gray-700 px-5 py-2 font-semibold text-white hover:bg-gray-800"
            >
              Close
            </button>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* ID */}

            <div className="rounded-lg border p-4">

              <p className="text-sm text-gray-500">
                Student ID
              </p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {selectedStudent.id}
              </p>

            </div>

            {/* Name */}

            <div className="rounded-lg border p-4">

              <p className="text-sm text-gray-500">
                Student Name
              </p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {selectedStudent.name}
              </p>

            </div>

            {/* Email */}

            <div className="rounded-lg border p-4">

              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {selectedStudent.email}
              </p>

            </div>

            {/* Phone */}

            <div className="rounded-lg border p-4">

              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {selectedStudent.phone}
              </p>

            </div>

            {/* Course */}

            <div className="rounded-lg border p-4">

              <p className="text-sm text-gray-500">
                Course
              </p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {selectedStudent.course}
              </p>

            </div>

            {/* Date Joined */}

            <div className="rounded-lg border p-4">

              <p className="text-sm text-gray-500">
                Date Joined
              </p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {selectedStudent.date_joined
                  ? selectedStudent.date_joined
                  : "Not available"}
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Add / Edit Student */}

      <div className="mb-8 rounded-lg bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-bold text-gray-700">

          {editingId
            ? "Edit Student"
            : "Add Student"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-2"
        >

          {/* Name */}

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="rounded border p-3"
            required
          />

          {/* Email */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="rounded border p-3"
            required
          />

          {/* Phone */}

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            className="rounded border p-3"
            maxLength="10"
            required
          />

          {/* Course */}

          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(event) =>
              setCourse(event.target.value)
            }
            className="rounded border p-3"
            required
          />

          {/* Buttons */}

          <div className="flex gap-3 md:col-span-2">

            <button
              type="submit"
              className="rounded bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-700"
            >
              {editingId
                ? "Update Student"
                : "Add Student"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="rounded bg-gray-500 px-6 py-3 font-semibold text-white hover:bg-gray-600"
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      {/* Search */}

      <div className="mb-6 flex gap-3">

        <input
          type="text"
          placeholder="Search student by name..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-full rounded border bg-white p-3"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="rounded bg-gray-700 px-5 py-2 font-semibold text-white hover:bg-gray-800"
          >
            X
          </button>
        )}

      </div>

      {/* Student Table */}

      <div className="overflow-x-auto rounded-lg bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-800 text-white">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Course
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.length > 0 ? (

              filteredStudents.map((student) => (

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
                    {student.email}
                  </td>

                  <td className="p-4">
                    {student.phone}
                  </td>

                  <td className="p-4">
                    {student.course}
                  </td>

                  <td className="p-4">

                    <div className="flex flex-wrap gap-2">

                      {/* View */}

                      <button
                        type="button"
                        onClick={() =>
                          handleView(student)
                        }
                        className="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                      >
                        View
                      </button>

                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(student)
                        }
                        className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(student.id)
                        }
                        className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="p-8 text-center text-gray-500"
                >
                  No students found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;