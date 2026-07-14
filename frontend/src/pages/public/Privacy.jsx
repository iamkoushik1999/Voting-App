import PageHero from "../../components/ui/PageHero";

const sections = [
  {
    title: "1. Information We Collect",
    body: "For voters: name, mobile number, a generated Voter ID, and a hashed password. For admins: an admin username and hashed password. For contact form submissions: name, email address, and your message.",
  },
  {
    title: "2. Information We Do Not Collect",
    body: "We do not collect national ID numbers, payment information, or precise location data. We do not store which candidate a specific voter voted for — only that they have voted, to preserve ballot secrecy.",
  },
  {
    title: "3. How We Use Information",
    body: "Voter and admin data is used solely to operate the Platform: authenticating logins, preventing duplicate voting, and displaying aggregate results. Contact form submissions are used only to respond to your inquiry.",
  },
  {
    title: "4. Password Storage",
    body: "Passwords are never stored in plain text. They are hashed using bcrypt before being saved to the database.",
  },
  {
    title: "5. Cookies",
    body: "The Platform uses a single essential, httpOnly session cookie to keep you logged in. It is not used for tracking or advertising, and no third-party analytics cookies are set.",
  },
  {
    title: "6. Data Sharing",
    body: "We do not sell or share your personal information with third parties. Data stays within the Platform's database.",
  },
  {
    title: "7. Data Retention",
    body: "Voter and candidate records are retained for as long as the administrator keeps them in the system, and can be deleted by the administrator at any time.",
  },
  {
    title: "8. Your Rights",
    body: "You may contact the administrator via the Contact Us page to request correction or deletion of your voter record.",
  },
  {
    title: "9. Changes to This Policy",
    body: "This policy may be updated periodically. Material changes will be reflected by updating the date above.",
  },
];

const Privacy = () => (
  <div>
    <PageHero title="Privacy Policy" subtitle="Last updated: July 2026" />
    <section className="mx-auto max-w-3xl space-y-8 px-4 py-14">
      <p className="text-sm text-navy-500">
        This is placeholder policy content written for a demonstration project, describing how
        this specific application actually handles data.
      </p>
      {sections.map((s) => (
        <div key={s.title}>
          <h2 className="font-heading text-lg font-bold text-navy-900">{s.title}</h2>
          <p className="mt-2 leading-relaxed text-navy-600">{s.body}</p>
        </div>
      ))}
    </section>
  </div>
);

export default Privacy;
