//This is a shared routes between all other routes. It is the header and footer for this application.
import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { getUser } from "../utils/getUser";

const HeaderFooter = () => {
  const [navBarVisible, setNavBarVisible] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    getUser(setUser);
  }, [accessToken]);

  // Hide the nav bar whenever the location changes
  useEffect(() => {
    setNavBarVisible(false);
  }, [location]);

  const toggleNavBar = () => {
    setNavBarVisible(!navBarVisible);
  };

  const Logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div>
      <div className="m-4 indie-flower-regular">
        <Link to="/" className="text-3xl pl-4 text-green-500 inline">
          My CSS
        </Link>
        <div className="mr-4 ml-4 float-right inline-block relative hover:ml-[12px]">
          <i
            className={`fa-solid fa-bars text-3xl text-green-500 float-right hover:cursor-pointer hover:text-4xl bar-button ${
              navBarVisible ? "hidden" : undefined
            }`}
            onClick={toggleNavBar}
          ></i>
          <div
            className={`absolute w-[350px] h-[97svh] top-0 right-0 ${
              navBarVisible ? "inline-block" : "hidden"
            }`}
          >
            <div className="w-full h-full bg-[rgba(23,23,23,0.73)]">
              <i
                className="fa-solid fa-x text-3xl text-green-500 float-right mr-2 mt-2 hover:cursor-pointer hover:text-4xl"
                onClick={toggleNavBar}
              ></i>
              <Link
                to="/"
                className="block text-white text-center text-2xl border-b-2 border-white p-2 pt-14 hover:text-green-500"
              >
                Home
              </Link>
              {user && (
                <Link
                  to={`/personal-sanctuary/${user.user_id}`}
                  className="block text-white text-center text-2xl border-b-2 border-white p-2 pt-6 hover:text-green-500"
                >
                  Personal-Sanctuary
                </Link>
              )}
              {user && (
                <Link
                  to={`/user-profile`}
                  className="block text-white text-center text-2xl border-b-2 border-white p-2 pt-6 hover:text-green-500"
                >
                  Edit Info
                </Link>
              )}

              {user && (
                <Link
                  to="/upload"
                  className="block text-white text-center text-2xl border-b-2 border-white p-2 pt-6 hover:text-green-500"
                >
                  Upload
                </Link>
              )}
              {user ? null : (
                <Link
                  to="/login"
                  className="block text-white text-center text-2xl border-b-2 border-white p-2 pt-6 hover:text-green-500"
                >
                  Login
                </Link>
              )}
              {user ? null : (
                <Link
                  to="/register"
                  className="block text-white text-center text-2xl border-b-2 border-white p-2 pt-6 hover:text-green-500"
                >
                  Register
                </Link>
              )}
              {user && (
                <Link
                  className="block text-white text-center text-2xl border-b-2 border-white p-2 pt-6 hover:text-green-500"
                  onClick={Logout}
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
        {navBarVisible ? null : (
          <a href="https://github.com/rishavPoudelZ/my_css" className="float-right">
            <i
              className="fa-brands fa-github text-4xl hover:cursor-pointer"
              style={{ color: "#ffffff" }}
            ></i>
          </a>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default HeaderFooter;
