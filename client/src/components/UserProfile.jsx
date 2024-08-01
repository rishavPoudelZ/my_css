import { useState, useEffect } from "react";
import { getUser } from "../utils/getUser";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!accessToken) {
    window.location.href = "/login";
    return ;
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/userLinks`, user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      window.location.reload();
      console.log("Form submitted", response.data);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };
  

  useEffect(() => {
    getUser(setUser);
  }, []);

  return (
    <div className="border-2 border-green-500 m-8 h-[600px] ml-[190px] mr-[200px] indie-flower-regular text-center flex justify-center items-center flex-col">
      <h1 className="text-center text-5xl text-green-500">User Profile</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div className=" mt-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col m-2">
              <label htmlFor="username" className="text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="border-2 border-gray-500 p-2 w-60 bg-transparent outline-none appearance-none opacity-60"
                value={user.username}
                disabled
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="user_email" className="text-gray-700 mb-1">
                Email
              </label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                placeholder="Email"
                className="border-2 border-gray-500 p-2 w-60 bg-transparent outline-none appearance-none"
                value={user.user_email}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col m-2">
              <label htmlFor="linkedin_url" className="text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <input
                id="linkedin_url"
                name="linkedin_url"
                type="text"
                placeholder="LinkedIn URL"
                className="border-2 border-gray-500 p-2 w-60 bg-transparent outline-none appearance-none"
                value={user.linkedin_url ? `${user.linkedin_url}` : ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="github_url" className="text-gray-700 mb-1">
                GitHub URL
              </label>
              <input
                id="github_url"
                name="github_url"
                type="text"
                placeholder="GitHub URL"
                className="border-2 border-gray-500 p-2 w-60 bg-transparent outline-none appearance-none"
                value={user.github_url ? `${user.github_url}` : ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 m-2 w-32 text-xl float-right"
          >
            Update Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
