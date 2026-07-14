import { FaShieldAlt, FaUsers, FaCode } from "react-icons/fa";
import PageHero from "../../components/ui/PageHero";

const About = () => (
  <div>
    <PageHero
      title="About Us"
      subtitle="MERN Voting App is a demonstration election platform showing how a small organization could run secure, digital elections."
    />

    <section className="mx-auto max-w-4xl px-4 py-14">
      <h2 className="font-heading text-2xl font-bold text-navy-900">Our Mission</h2>
      <p className="mt-3 leading-relaxed text-navy-600">
        We built MERN Voting App to show that running a trustworthy election online doesn't
        require complicated infrastructure &mdash; just careful engineering. Administrators can
        register voters and candidates in minutes, and every voter gets a simple, secure way to
        cast exactly one ballot.
      </p>

      <p className="mt-4 leading-relaxed text-navy-600">
        This is a portfolio/demo project, not an official government body, and it is not
        affiliated with any real election commission. It's designed to be a realistic template for
        smaller-scale elections &mdash; student unions, clubs, cooperatives, or internal company
        votes &mdash; where a lightweight, self-hosted voting portal is useful.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        <div>
          <FaShieldAlt className="mb-3 text-gold-500" size={26} />
          <h3 className="font-heading text-lg font-bold text-navy-900">Security first</h3>
          <p className="mt-2 text-sm text-navy-500">
            Hashed passwords, httpOnly session cookies, rate-limited logins, and atomic vote
            counting to prevent double-voting.
          </p>
        </div>
        <div>
          <FaUsers className="mb-3 text-gold-500" size={26} />
          <h3 className="font-heading text-lg font-bold text-navy-900">Built for admins</h3>
          <p className="mt-2 text-sm text-navy-500">
            A single dashboard to manage voters, candidates, and incoming messages &mdash; no
            spreadsheets required.
          </p>
        </div>
        <div>
          <FaCode className="mb-3 text-gold-500" size={26} />
          <h3 className="font-heading text-lg font-bold text-navy-900">Open architecture</h3>
          <p className="mt-2 text-sm text-navy-500">
            A standard MERN stack (MongoDB, Express, React, Node) that's straightforward to audit,
            extend, and self-host.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default About;
