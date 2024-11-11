import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserCircle, ChevronDown, LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { logoutUser } from "../Redux/userData";
import { apiClient } from "./Axios";

export default function Navbar() {
  const { name, _id } = useSelector((state: RootState) => state.userLogin);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    try {
      await apiClient.get("/api/logout", { withCredentials: true });
      localStorage.removeItem("accessToken");
      dispatch(logoutUser());
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hosta</h1>
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`hover:text-green-200 transition-colors ${
                  pathname === item.path ? "font-bold text-green-950" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            {_id ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 hover:text-green-200 focus:outline-none"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="truncate max-w-[100px]">{name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-100 hover:text-red-900"
                        role="menuitem"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hover:text-green-200 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 hover:text-green-200 transition-colors ${
                  pathname === item.path ? "font-bold text-green-950" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            {_id ? (
              <div className="py-2">
                <div className="flex items-center space-x-2 mb-2">
                  <UserCircle className="h-5 w-5" />
                  <span className="truncate max-w-[200px]">{name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-700 hover:text-red-900"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block py-2 hover:text-green-200 transition-colors"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}