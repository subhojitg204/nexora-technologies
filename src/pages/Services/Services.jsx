
const services = [
  ['01', 'Web Development', 'Modern responsive websites.'],
  ['02', 'UI/UX Design', 'Beautiful user experiences.'],
  ['03', 'Digital Strategy', 'Smart business solutions.'],
  ['04', 'Cloud Solutions', 'Secure cloud infrastructure.'],
  ['05', 'Data Analytics', 'Better business decisions.'],
  ['06', 'Technical Support', 'Reliable ongoing assistance.']
];

export default function Services() {
  return (
    <section className="content-section page-content">

      <span className="section-label">OUR EXPERTISE</span>

      <h2>Services that move business forward.</h2>

      <div className="service-grid">
        {services.map(([number, title, description]) => (
          <article className="service-card" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>

    </section>
  );
}
