
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Northstar Finance',
    category: 'Web Design',
    description: 'A modern financial platform with a clean user interface and intuitive dashboard.',
    image: '/images/finance.jpg',
    technology: 'React, CSS, JavaScript'
  },
  {
    id: 2,
    title: 'Forma Living',
    category: 'Development',
    description: 'An elegant e-commerce experience designed for a modern lifestyle brand.',
    image: '/images/ecommerce.jpg',
    technology: 'React, Node.js, CSS'
  },
  {
    id: 3,
    title: 'Orbit Analytics',
    category: 'Development',
    description: 'A data analytics dashboard that helps businesses understand their performance.',
    image: '/images/analytics.jpg',
    technology: 'React, JavaScript, Charts'
  },
  {
    id: 4,
    title: 'Morrow Identity',
    category: 'Branding',
    description: 'A creative brand identity with a consistent visual language.',
    image: '/images/branding.jpg',
    technology: 'Figma, Illustrator, UI Design'
  }
];

const categories = ['All', 'Web Design', 'Development', 'Branding'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project =>
    activeCategory === 'All' ||
    project.category === activeCategory
  );

  return (
    <section className="content-section page-content portfolio-page">

      <span className="section-label">OUR PORTFOLIO</span>

      <h2>Ideas transformed into impact.</h2>

      <p>
        Explore some of our creative digital projects and solutions.
      </p>

      {/* Category Filters */}
      <div className="portfolio-filters" aria-label="Filter projects">
        {categories.map(category => (
          <button
            key={category}
            className={activeCategory === category ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Gallery */}
      <div className="portfolio-grid">
        {filteredProjects.map(project => (
          <article className="portfolio-card" key={project.id}>

            <div className="portfolio-image">
              <img
                src=<img
  src="/images/ecommerce.jpg"
  alt="E-commerce website design with product listings"
/>
                alt={`${project.title} project preview`}
                loading="lazy"
                onError={event => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div className="portfolio-info">
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <button
                className="project-btn"
                onClick={() => setSelectedProject(project)}
              >
                View Project ↗
              </button>
            </div>

          </article>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            onClick={event => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              ✕
            </button>

            <span className="section-label">
              {selectedProject.category}
            </span>

            <h2 id="project-title">{selectedProject.title}</h2>

            <p>{selectedProject.description}</p>

            <h3>Technologies Used</h3>

            <p>{selectedProject.technology}</p>

            <button
              className="primary-button"
              onClick={() => setSelectedProject(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
