import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { GiVote } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { admin, voter } = useAuth();
  const navigate = useNavigate();

  const dashboardPath = admin ? "/admin" : voter ? "/voter" : null;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-navy-900 text-navy-100">
        <p className="mx-auto max-w-6xl truncate px-4 py-1.5 text-xs sm:text-sm">
          MERN Voting App &mdash; a secure online election platform (demo project)
        </p>
      </div>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-gold-400">
            <GiVote size={20} />
          </span>
          <span className="font-heading text-lg font-bold text-navy-900">MERN Voting App</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-navy-900" : "text-navy-500 hover:text-navy-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {dashboardPath ? (
            <Button variant="primary" className="ml-3" onClick={() => navigate(dashboardPath)}>
              Dashboard
            </Button>
          ) : (
            <Button variant="primary" className="ml-3" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy-700 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy-100 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive ? "bg-navy-50 text-navy-900" : "text-navy-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              variant="primary"
              className="mt-2"
              onClick={() => {
                setOpen(false);
                navigate(dashboardPath || "/login");
              }}
            >
              {dashboardPath ? "Dashboard" : "Login"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
