import PageHero from "../../components/ui/PageHero";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using MERN Voting App (the \"Platform\"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the Platform.",
  },
  {
    title: "2. Eligibility",
    body: "Access to the Platform as a voter requires an account issued by an authorized administrator. Voter IDs and passwords are personal and must not be shared, sold, or transferred.",
  },
  {
    title: "3. Account Responsibility",
    body: "You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify the administrator immediately if you suspect unauthorized access.",
  },
  {
    title: "4. Voting Integrity",
    body: "Each voter account may cast one vote per election. Attempting to circumvent this restriction, impersonate another voter, or otherwise interfere with the integrity of an election is strictly prohibited and may result in account termination.",
  },
  {
    title: "5. Acceptable Use",
    body: "You agree not to misuse the Platform, including attempting to gain unauthorized access to accounts or data, disrupting service availability, or submitting false information when registering.",
  },
  {
    title: "6. Administrator Responsibilities",
    body: "Administrators are responsible for the accuracy of voter and candidate data they enter, and for the appropriate handling of voter credentials distributed outside the Platform.",
  },
  {
    title: "7. Availability",
    body: "The Platform is provided on an \"as is\" and \"as available\" basis. We do not guarantee uninterrupted or error-free operation.",
  },
  {
    title: "8. Limitation of Liability",
    body: "To the fullest extent permitted by law, the operators of this Platform are not liable for any indirect, incidental, or consequential damages arising from your use of the Platform.",
  },
  {
    title: "9. Changes to These Terms",
    body: "These Terms may be updated from time to time. Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.",
  },
  {
    title: "10. Contact",
    body: "Questions about these Terms can be sent via the Contact Us page.",
  },
];

const Terms = () => (
  <div>
    <PageHero title="Terms & Conditions" subtitle="Last updated: July 2026" />
    <section className="mx-auto max-w-3xl space-y-8 px-4 py-14">
      <p className="text-sm text-navy-500">
        This is placeholder legal content written for a demonstration project. It is not legal
        advice and should be reviewed by counsel before use in a real deployment.
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

export default Terms;
