import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password, email };

    try {
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage("User registered successfully, PLease login now!");
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        setMessage(data.error || data.message || "Registration failed");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during registration");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    console.log(message); // Debugging
  };

  return (
    <div>
      <div className="border-2 border-green-500 m-8 h-[600px] ml-[190px] mr-[200px] indie-flower-regular text-center flex justify-center items-center flex-col">
        <h1 className="text-center text-5xl text-green-500">
          Register new account
        </h1>
        <Link to="/Login" className="hover:border-b-2 hover:border-blue-500">
          Have an account? Log in
        </Link>

        {message && <p className="text-indigo-400 mt-2 text-2xl">{message}</p>}
        <form onSubmit={(e) => handleSubmit(e)} className="font-sans">
          <div className="flex flex-col items-center mt-4 ">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="border-2 border-gray-500 p-2 m-2 w-60 bg-transparent outline-none appearance-none"
              onChange={(e) => handleEmailChange(e)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="border-2 border-gray-500 p-2 m-2 w-60 bg-transparent outline-none appearance-none"
              value={username}
              minLength="5"
              onChange={(e) => handleUsernameChange(e)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              minLength="8"
              className="border-2 border-gray-500 p-2 m-2 w-60 bg-transparent outline-none appearance-none"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 m-2 w-32 indie-flower-regular hover:bg-green-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
