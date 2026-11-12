
const plans = [
  ['Launch', '₹24,999', 'For new businesses'],
  ['Growth', '₹59,999', 'For growing companies'],
  ['Scale', 'Custom', 'For larger projects']
];

export default function Pricing() {
  return (
    <section className="content-section page-content">

      <span className="section-label">OUR PRICING</span>

      <h2>Choose your growth plan.</h2>

      <div className="service-grid">
        {plans.map(([name, price, description]) => (
          <article className="service-card" key={name}>
            <h3>{name}</h3>
            <h2>{price}</h2>
            <p>{description}</p>

            <a href="/contact" className="primary-button">
              Get Started ↗
            </a>
          </article>
        ))}
      </div>

    </section>
  );
}
