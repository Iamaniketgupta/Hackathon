import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ragpicker from "../assets/ragpicker.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // Replace with the actual path to your logout action

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const status = useSelector((state) => state.auth.status); // Assuming status is a boolean
  const type = useSelector((state) => state.auth.type);
  const user = useSelector(state=>state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    setIsDropdownOpen(!isDropdownOpen);
    e.stopPropagation();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };
    // useEffect(() => {
    //     window.onclick = () => {
    //         setIsDropdownOpen(false);
    //     };
    // },[]);

  useEffect(() => {
    window.onclick = () => {
      setIsDropdownOpen(false);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsDropdownOpen(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="backdrop-blur-xl bg-black/5">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={ragpicker}
                className="h-10 rounded-lg"
                alt="RagPickers Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                RagPickers
              </span>
            </Link>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-1 sm:gap-2 md:gap-3">
              {status ? (
                <>
                  <button
                    type="button"
                    className="flex mx-3 text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only mx-3">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.pfp}
                      alt="user photo"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="z-50 absolute right-[60px] md:right-[100px] mt-[260px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="user-dropdown"
                    >
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                          Bonnie Green
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                          name@flowbite.com
                        </span>
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        {type === "user" ? (
                          <>
                            <li>
                              <Link
                                to={`${type}/dashboard/profile`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${type}/dashboard/history`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                History
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${type}/dashboard/settings`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Settings
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link
                                to={`/${type}/dashboard`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${type}/dashboard/settings`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Settings
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`${type}/dashboard/earning`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                Earnings
                              </Link>
                            </li>
                          </>
                        )}
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="hidden sm:block text-sm mx-3 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/user/signin"
                    className="hidden sm:block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                  >
                    Join as User
                  </Link>
                  <Link
                    to="/rp/signin"
                    className="hidden sm:block text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                  >
                    Join as Ragpicker
                  </Link>
                </div>
              )}
              <button
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
                isMobileMenuOpen ? "block" : "hidden"
              }`}
              id="navbar-user"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);
              }}
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/book"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Bookings
                  </Link>
                </li>
                {status && (
                  <li>
                    <Link
                      to={`/${type}/dashboard`}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 
                                                    cursor-pointer
                                                    md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                {!status && (
                  <div className="block md:hidden w-full text-center space-y-2">
                    <Link
                      to="/user/signin"
                      className="block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                    >
                      Join as User
                    </Link>
                    <Link
                      to="/rp/signin"
                      className="block text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                    >
                      Join as Ragpicker
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
