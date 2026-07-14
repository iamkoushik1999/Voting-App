import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMenu, IoClose, IoLogOutOutline } from "react-icons/io5";
import { GiVote } from "react-icons/gi";

const DashboardLayout = ({ title, navItems, onLogout, identityLabel }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive ? "bg-navy-800 text-white" : "text-navy-200 hover:bg-navy-800/60 hover:text-white"
    }`;

  const sidebarContent = (
    <>
      <Link to="/" className="mb-8 flex items-center gap-2.5 px-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-navy-950">
          <GiVote size={18} />
        </span>
        <span className="font-heading text-base font-bold text-white">MERN Voting App</span>
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-navy-200 hover:bg-navy-800/60 hover:text-white"
      >
        <IoLogOutOutline size={18} /> Logout
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-navy-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-navy-950 p-5 lg:flex">
        {sidebarContent}
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="flex w-64 flex-col bg-navy-950 p-5">{sidebarContent}</div>
          <div className="flex-1 bg-navy-950/60" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-navy-100 bg-white px-4 py-3.5 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md p-2 text-navy-700 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <IoMenu size={22} />
            </button>
            <h1 className="font-heading text-lg font-bold text-navy-900">{title}</h1>
          </div>
          {identityLabel && (
            <span className="hidden text-sm text-navy-500 sm:block">{identityLabel}</span>
          )}
        </header>
        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
