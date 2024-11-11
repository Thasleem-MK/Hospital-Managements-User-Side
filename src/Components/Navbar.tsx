import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserCircle, ChevronDown, LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { logoutUser } from "../Redux/userData";
import { apiClient } from "./Axios";

// Define types for props where necessary
type DropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

type NavItemProps = {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

// Dropdown component
const Dropdown = ({ isOpen, onClose, children }: DropdownProps) => {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        onClick={onClose} // Close dropdown when clicking outside
      >
        {children}
      </div>
    </div>
  );
};

// MobileMenu component
const MobileMenu = ({ isOpen, onClose, children }: MobileMenuProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-fit w-fit bg-green-600 text-white shadow-lg p-4 px-10 rounded-bl-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

// NavItem component
const NavItem = ({ to, children, isActive, onClick }: NavItemProps) => (
  <Link
    to={to}
    className={`block py-2 hover:text-green-200 transition-colors ${
      isActive ? "font-bold text-green-950" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

// Main Navbar component
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
          <Link to="/">
            <h1 className="text-2xl font-bold">Hosta</h1>
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                to={item.path}
                isActive={pathname === item.path}
              >
                {item.name}
              </NavItem>
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
                <Dropdown
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-100 hover:text-red-900"
                    role="menuitem"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </button>
                </Dropdown>
              </div>
            ) : (
              <NavItem to="/login">Login</NavItem>
            )}
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              to={item.path}
              isActive={pathname === item.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </NavItem>
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
            <NavItem to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </NavItem>
          )}
        </MobileMenu>
      </div>
    </nav>
  );
}
