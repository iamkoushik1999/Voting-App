const PageHero = ({ title, subtitle }) => (
  <section className="bg-navy-950 text-white">
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-navy-300">{subtitle}</p>}
    </div>
  </section>
);

export default PageHero;
