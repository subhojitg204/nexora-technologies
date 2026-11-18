import ScrollReveal from '../../components/ScrollReveal';
import { Link } from 'react-router-dom';
import FAQ from '../../components/FAQ/FAQ';
import Testimonials from '../../components/Testimonials/Testimonials';

export default function Home() {
  return (
    
    <>
      <ScrollReveal />
      {/* PREMIUM HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">

          <span className="hero-label">
            ✦ INDEPENDENT DIGITAL STUDIO
          </span>

          <h1>
            We Build Digital
            <br />
            <span>Experiences That Matter.</span>
          </h1>

          <p>
            From powerful websites to innovative digital
            solutions, NEXORA Technologies helps ambitious
            businesses turn ideas into meaningful experiences.
          </p>

          <div className="hero-buttons">
            <Link to="/contact" className="primary-button">
              Start Your Project ↗
            </Link>

            <Link to="/services" className="secondary-button">
              Explore Our Services →
            </Link>
          </div>

          <div className="hero-highlights">
            <div className="hero-highlight">
              <strong>Creative</strong>
              <span>Design Thinking</span>
            </div>

            <div className="hero-highlight">
              <strong>Modern</strong>
              <span>Technology Stack</span>
            </div>

            <div className="hero-highlight">
              <strong>Scalable</strong>
              <span>Digital Solutions</span>
            </div>
          </div>

        </div>

        {/* EXISTING HERO VISUAL */}
        <div className="hero-visual">
          <div className="visual-circle">
            <div className="visual-inner">
              <span>N</span>
              <p>IDEAS IN MOTION</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="content-section">
        <span className="section-label">
          WHO WE ARE
        </span>

        <h2>
          Technology with a purpose.
        </h2>

        <p>
          We combine creativity, modern technology and
          thoughtful design to help businesses build
          stronger digital experiences.
        </p>
      </section>

{/* PREMIUM SERVICES PREVIEW */}
<section className="home-services">
  <div className="home-services-heading">
    <span className="section-label">
      WHAT WE DO
    </span>

    <h2>Solutions built for what's next.</h2>

    <p>
      We combine creativity and technology to build
      meaningful digital experiences.
    </p>
  </div>

  <div className="home-services-grid">
    <article className="home-service-card">
      <span className="home-service-icon" aria-hidden="true">
        💻
      </span>
      <h3>Web Development</h3>
      <p>
        Fast, responsive and modern websites designed
        to grow with your business.
      </p>
      <Link to="/services">Explore Service →</Link>
    </article>

    <article className="home-service-card">
      <span className="home-service-icon" aria-hidden="true">
        🎨
      </span>
      <h3>UI/UX Design</h3>
      <p>
        Beautiful and intuitive interfaces that make
        every interaction feel effortless.
      </p>
      <Link to="/services">Explore Service →</Link>
    </article>

    <article className="home-service-card">
      <span className="home-service-icon" aria-hidden="true">
        🚀
      </span>
      <h3>Digital Solutions</h3>
      <p>
        Scalable digital solutions built around
        your business goals.
      </p>
      <Link to="/services">Explore Service →</Link>
    </article>
  </div>
</section>

{/* FEATURED PROJECTS SHOWCASE */}
<section className="home-projects">
  <div className="home-projects-header">
    <div>
      <span className="section-label">OUR WORK</span>
      <h2>Ideas brought to life.</h2>
      <p>
        Explore the digital experiences and solutions
        we love creating.
      </p>
    </div>

    <Link to="/portfolio" className="home-projects-link">
      View Portfolio →
    </Link>
  </div>

  <div className="home-projects-grid">
    <article className="home-project-card">
      <div className="home-project-art project-art-one">
        <span aria-hidden="true">◈</span>
      </div>
      <div className="home-project-info">
        <span>WEB DEVELOPMENT</span>
        <h3>Modern E-Commerce</h3>
        <p>Fast, engaging online shopping experiences.</p>
      </div>
    </article>

    <article className="home-project-card">
      <div className="home-project-art project-art-two">
        <span aria-hidden="true">▦</span>
      </div>
      <div className="home-project-info">
        <span>UI/UX DESIGN</span>
        <h3>Analytics Dashboard</h3>
        <p>Clear, intuitive interfaces for complex data.</p>
      </div>
    </article>

    <article className="home-project-card">
      <div className="home-project-art project-art-three">
        <span aria-hidden="true">✦</span>
      </div>
      <div className="home-project-info">
        <span>CREATIVE DESIGN</span>
        <h3>Digital Brand Experience</h3>
        <p>Memorable websites with distinctive identities.</p>
      </div>
    </article>
  </div>
</section>

      {/* EXISTING COMPONENTS */}
      
{/* PREMIUM CALL TO ACTION */}
<section className="home-cta">
  <div className="home-cta-content">
    <span className="home-cta-label">
      ✦ LET'S CREATE SOMETHING GREAT
    </span>

    <h2>Have a project in mind?</h2>

    <p>
      Let's turn your ideas into powerful digital
      experiences. Your next big project starts here.
    </p>

    <Link to="/contact" className="home-cta-button">
      Let's Work Together ↗
    </Link>
  </div>
</section>

      <Testimonials />
      <FAQ />
    </>
  );
}
