import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import PageHero from "../../components/ui/PageHero";

const faqs = [
  {
    q: "Who can vote on this platform?",
    a: "Only people registered by an election administrator can vote. If you haven't received a Voter ID and password, contact your administrator or use the Contact Us page.",
  },
  {
    q: "How do I get my login credentials?",
    a: "An administrator creates your voter account and gives you a Voter ID (e.g. V-000123) and an initial password directly. This platform does not support self-registration.",
  },
  {
    q: "Can I change my vote after submitting it?",
    a: "No. Once a ballot is cast it is final. This prevents tampering and keeps the tally trustworthy.",
  },
  {
    q: "Is my vote anonymous?",
    a: "Yes. The system only records that you have voted, not who you voted for. Candidate vote counts are stored independently of any individual voter record.",
  },
  {
    q: "I forgot my password. What do I do?",
    a: "Contact your election administrator — they can look up your Voter ID and, if needed, reset your account.",
  },
  {
    q: "Is this an official government website?",
    a: "No. MERN Voting App is an independent demonstration project styled after official election portals. It is not affiliated with any government or election commission.",
  },
  {
    q: "What happens to the results after voting closes?",
    a: "Logged-in voters and admins can view live results at any time from the Results page while the election is active.",
  },
  {
    q: "Which browsers are supported?",
    a: "Any modern, up-to-date browser — Chrome, Firefox, Edge, or Safari — on desktop or mobile.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know before you vote." />
      <section className="mx-auto max-w-3xl px-4 py-14">
        <div className="divide-y divide-navy-100 rounded-xl border border-navy-100">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="font-medium text-navy-900">{item.q}</span>
                  <IoChevronDown
                    className={`shrink-0 text-navy-400 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && <p className="px-5 pb-4 text-sm leading-relaxed text-navy-600">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
