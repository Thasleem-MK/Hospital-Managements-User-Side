import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const path = useLocation().pathname;
  console.log(path.slice(1));

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hospital Project</h1>
        <ul className="flex space-x-4">
          {["home", "about", "contact"].map((item) => (
            <li key={item}>
              <Link
                to={item === "home" ? "/" : `/${item}`}
                className={`hover:text-green-200 ${
                  path == "/" && item === "home"
                    ? "font-bold text-green-950"
                    : path.slice(1) == item
                    ? "font-bold text-green-950"
                    : ""
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
