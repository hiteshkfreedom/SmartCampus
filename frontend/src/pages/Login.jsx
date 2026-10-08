import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Invalid username or password."
        );
        setLoading(false);
        return;
      }

      // Save login information
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token);

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          SmartCampus
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Login to your account
        </p>

        <form onSubmit={handleLogin}>

          {/* Username */}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            className="mb-4 w-full rounded border p-3"
            required
          />

          {/* Password */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="mb-4 w-full rounded border p-3"
            required
          />

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Message */}

        {message && (
          <p className="mt-4 text-center font-semibold text-gray-700">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default Login;