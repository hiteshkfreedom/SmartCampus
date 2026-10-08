import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Marks from "./pages/Marks";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Login from "./pages/Login";

import ProtectedRoute from "./ProtectedRoute";


function Navigation() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 px-6 py-4 shadow">

      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          SmartCampus
        </Link>

        {/* Navigation Links */}

        <div className="flex flex-wrap items-center gap-5">

          <Link
            to="/"
            className="font-semibold text-white hover:text-gray-300"
          >
            Dashboard
          </Link>

          <Link
            to="/students"
            className="font-semibold text-white hover:text-gray-300"
          >
            Students
          </Link>

          <Link
            to="/marks"
            className="font-semibold text-white hover:text-gray-300"
          >
            Performance
          </Link>

          <Link
            to="/attendance"
            className="font-semibold text-white hover:text-gray-300"
          >
            Attendance
          </Link>

          <Link
            to="/results"
            className="font-semibold text-white hover:text-gray-300"
          >
            Results
          </Link>

        </div>

        {/* User + Logout */}

        <div className="flex items-center gap-4">

          <span className="font-semibold text-white">
            Welcome, {username}
          </span>

          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navigation />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        {/* Students */}

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <>
                <Navigation />
                <Students />
              </>
            </ProtectedRoute>
          }
        />

        {/* Performance */}

        <Route
          path="/marks"
          element={
            <ProtectedRoute>
              <>
                <Navigation />
                <Marks />
              </>
            </ProtectedRoute>
          }
        />

        {/* Attendance */}

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <>
                <Navigation />
                <Attendance />
              </>
            </ProtectedRoute>
          }
        />

        {/* Results */}

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <>
                <Navigation />
                <Results />
              </>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;