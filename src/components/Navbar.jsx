import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/logo3.png";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut().then().catch();
  };

  return (
    <div className=" lg:px-10 lg:py-2 sticky top-0 z-50 bg-base-200">
      <div className="navbar z-20 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLink
                className={({ isActive }) =>
                  `font-bold ${
                    isActive
                      ? "text-blue-500 bg-white px-3 py-2 rounded-xl"
                      : "hover:text-blue-500"
                  }`
                }
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `font-bold ${
                    isActive
                      ? "text-blue-500  bg-white px-3 py-2 rounded-xl"
                      : "hover:text-blue-500"
                  }`
                }
                to="/add-task"
              >
                Add Task
              </NavLink>
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-blue-500 text-2xl font-bold lg:flex hidden"
          >
            Task_Master
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="space-x-6 text-xl px-1 gap-6">
            <NavLink
              className={({ isActive }) =>
                `font-bold ${
                  isActive
                    ? "text-blue-500 bg-white px-3 py-2 rounded-xl"
                    : "hover:text-blue-500"
                }`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `font-bold ${
                  isActive
                    ? "text-blue-500  bg-white px-3 py-2 rounded-xl"
                    : "hover:text-blue-500"
                }`
              }
              to="/add-task"
            >
              Add Task
            </NavLink>
          </ul>
        </div>
        <div className="navbar-end gap-5">
          <div className="flex-none">
            <button
              className="btn btn-ghost btn-circle"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.485-8.485h-1M4.515 12h-1m15.364 4.95l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707-.707M12 9a3 3 0 100 6 3 3 0 000-6z"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* <div>
            <Link
              to="/login"
              className="btn bg-green-400 text-xl text-white font-bold "
            >
              Login
            </Link>
          </div> */}
          {user ? (
            <div className="z-10">
              <div className="flex-none gap-2 ">
                <div className="dropdown dropdown-end ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        className="w-[60px] h-[60px] border-4 border-zinc-300 rounded-full cursor-pointer"
                        src={user?.photoURL}
                        alt=""
                      />
                    </div>
                  </div>

                  <div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
                    >
                      <li>
                        <a className="justify-between">
                          <h3 className="text-xl font-bold text-center text-gray-700">
                            {user?.displayName}
                          </h3>
                        </a>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="btn bg-blue-500 text-base text-white"
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={handleLogOut}
                          className="btn bg-blue-500 text-lg text-white font-bold"
                        >
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-blue-500 text-xl text-white font-bold ">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
