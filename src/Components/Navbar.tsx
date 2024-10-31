import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserCircle, ChevronDown, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { logoutUser, updateUserData } from "../Redux/userData";
import { apiClient } from "./Axios";

export default function Navbar() {
  const { name, isLogin } = useSelector((state: RootState) => state.userLogin);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      await apiClient
        .get("/api/users", { withCredentials: true })
        .then((result) => {
          const { email, name, phone, password, _id } = result.data.data;
          dispatch(
            updateUserData({
              email: email,
              name: name,
              password: password,
              phone: phone,
              _id: _id as string,
              isLogin: true,
            })
          );
        })
        .catch((err) => console.log("err in getting user login", err));
    };
    data();
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hosta</h1>
        <ul className="flex space-x-4 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`hover:text-green-200 transition-colors ${
                  pathname === item.path ? "font-bold text-green-950" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {isLogin ? (
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 hover:text-green-200 focus:outline-none"
              >
                <UserCircle className="h-5 w-5" />
                <span>{name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={async () => {
                        await apiClient
                          .post(
                            "/api/users/logout",
                            {},
                            { withCredentials: true }
                          )
                          .then(() => {
                            dispatch(logoutUser());
                            setIsDropdownOpen(false);
                          })
                          .catch((err) => console.log(err));
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-100 hover:text-red-900"
                      role="menuitem"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="hover:text-green-200 transition-colors"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
