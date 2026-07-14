import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import PageHero from "../../components/ui/PageHero";
import Field from "../../components/ui/Field";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import api, { getErrorMessage } from "../../api/axios";

const initialForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", text: "" });
    try {
      const { data } = await api.post("/public/contact", form);
      setStatus({ type: "success", text: data.message });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: "error", text: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Questions about registering, voting, or running an election on this platform? Reach out."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <h2 className="font-heading text-xl font-bold text-navy-900">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-sm text-navy-600">
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 shrink-0 text-gold-500" /> support@example.com
            </li>
            <li className="flex items-start gap-3">
              <FaPhone className="mt-1 shrink-0 text-gold-500" /> +1 (555) 010-0100
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-gold-500" />
              123 Democracy Lane, Suite 200
              <br />
              Springfield, USA
            </li>
          </ul>
          <p className="mt-6 text-xs text-navy-400">
            Placeholder contact details for this demo project. Messages submitted here are stored
            and reviewed by the site administrator.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:col-span-3">
          {status.text && <Alert type={status.type}>{status.text}</Alert>}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="name"
              name="name"
              label="Your name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
            <Field
              id="email"
              name="email"
              type="email"
              label="Email address"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
            />
          </div>
          <Field
            id="subject"
            name="subject"
            label="Subject"
            required
            value={form.subject}
            onChange={handleChange}
            placeholder="How do I register to vote?"
          />
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-800">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-md border border-navy-200 px-3 py-2.5 text-navy-900 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
              placeholder="Tell us how we can help..."
            />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
