import { Link } from "react-router-dom";
import { GiVote } from "react-icons/gi";

const columns = [
  {
    title: "Portal",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/faq", label: "FAQ" },
      { to: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/terms", label: "Terms & Conditions" },
      { to: "/privacy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Access",
    links: [
      { to: "/login", label: "Voter / Admin Login" },
      { to: "/results", label: "Election Results" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-navy-800 bg-navy-950 text-navy-300">
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-gold-400">
              <GiVote size={18} />
            </span>
            <span className="font-heading text-base font-bold text-white">MERN Voting App</span>
          </div>
          <p className="text-sm leading-relaxed text-navy-400">
            A secure, transparent online voting platform built as a demonstration project. Not
            affiliated with any government election authority.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-400">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-navy-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 border-t border-navy-800 pt-6 text-xs text-navy-500">
        &copy; {new Date().getFullYear()} MERN Voting App. All rights reserved. This is a
        portfolio/demo project.
      </div>
    </div>
  </footer>
);

export default Footer;
