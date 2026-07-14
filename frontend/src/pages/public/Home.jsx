import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCheck, FaVoteYea, FaChartBar, FaShieldAlt, FaLock, FaEye } from "react-icons/fa";
import api from "../../api/axios";
import Button from "../../components/ui/Button";
import StatCard from "../../components/ui/StatCard";

const steps = [
  {
    icon: FaUserCheck,
    title: "Get registered",
    body: "The election administrator registers eligible voters and issues each one a unique Voter ID and password.",
  },
  {
    icon: FaVoteYea,
    title: "Log in and vote",
    body: "Sign in with your Voter ID, review the candidates, and cast your ballot. Each voter can only vote once.",
  },
  {
    icon: FaChartBar,
    title: "View the results",
    body: "Once you've voted, check live results at any time to see how the tally is shaping up.",
  },
];

const values = [
  {
    icon: FaShieldAlt,
    title: "Secure by design",
    body: "Passwords are hashed, sessions use httpOnly cookies, and every write action is authenticated.",
  },
  {
    icon: FaLock,
    title: "One voter, one vote",
    body: "Ballots are claimed atomically, so it's not possible to double-vote even under heavy load.",
  },
  {
    icon: FaEye,
    title: "Transparent tallying",
    body: "Vote counts are public to logged-in voters and admins as soon as they're cast.",
  },
];

const Home = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/public/stats")
      .then(({ data }) => setStats(data.stats))
      .catch(() => setStats(null));
  }, []);

  return (
    <div>
      <section className="bg-navy-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-400">
              Secure &middot; Transparent &middot; Accessible
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
              A trustworthy home for your election
            </h1>
            <p className="mt-5 max-w-lg text-navy-200">
              MERN Voting App lets an administrator run a full election end-to-end: register
              voters, list candidates, and let every voter cast a single, secure ballot online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/login" variant="gold">
                Voter / Admin Login
              </Button>
              <Button as={Link} to="/about" variant="outline" className="border-navy-600 text-white hover:bg-navy-900">
                Learn how it works
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid w-full max-w-sm grid-cols-1 gap-4">
              <StatCard label="Registered voters" value={stats?.totalVoters ?? "—"} icon={FaUserCheck} accent="gold" />
              <StatCard label="Candidates standing" value={stats?.totalCandidates ?? "—"} icon={FaVoteYea} />
              <StatCard label="Votes cast so far" value={stats?.totalVotesCast ?? "—"} icon={FaChartBar} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy-900">How voting works</h2>
          <p className="mx-auto mt-3 max-w-xl text-navy-500">
            Three simple steps stand between registration and a counted vote.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative rounded-xl border border-navy-100 p-6">
              <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
                {i + 1}
              </span>
              <step.icon className="mb-4 mt-2 text-gold-500" size={28} />
              <h3 className="font-heading text-lg font-bold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm text-navy-500">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-navy-900">Built to be trusted</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 text-gold-400">
                  <v.icon size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm text-navy-500">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
        <h2 className="font-heading text-3xl font-bold text-navy-900">Ready to make your voice heard?</h2>
        <p className="mx-auto mt-3 max-w-xl text-navy-500">
          If you've been registered by an administrator, log in with your Voter ID to cast your
          ballot.
        </p>
        <Button as={Link} to="/login" variant="primary" className="mt-6">
          Go to Login
        </Button>
      </section>
    </div>
  );
};

export default Home;
