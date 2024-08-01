import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  if (localStorage.getItem("accessToken")) {
    window.location.href = "/";
    return;
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    const response = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (response.status === 200) {
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      localStorage.setItem("accessToken", data.token);
      window.location.href = "/";
    } else {
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setPassword("");
    }
  };

  return (
    <div className="border-2 border-green-500 m-8 h-[600px] ml-[190px] mr-[200px] indie-flower-regular text-center flex justify-center items-center flex-col">
      <h1 className="text-center text-5xl text-green-500">Sign in</h1>
      <Link
        to="/register"
        className="mt-4 ml-4 hover:border-b-2 hover:border-blue-500"
      >
        New user? Create an Account
      </Link>
      {message && <p className="text-indigo-400 mt-2 text-2xl">{message}</p>}
      <form action="" onSubmit={handleSubmit} className="font-sans">
        <div className="flex flex-col items-center mt-4">
          <input
            type="text"
            placeholder="Username"
            className="border-2 border-gray-500 p-2 m-2 w-60 bg-transparent outline-none appearance-none"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-500 p-2 m-2 w-60 bg-transparent outline-none appearance-none"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 m-2 w-32 indie-flower-regular hover:bg-green-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
