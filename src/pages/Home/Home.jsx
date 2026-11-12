import FAQ from '../../components/FAQ/FAQ';
import Testimonials from '../../components/Testimonials/Testimonials';
export default function Home() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-content">

          <span className="hero-label">
            ✦ INDEPENDENT DIGITAL STUDIO
          </span>

          <h1>
            Build What's <span>Next.</span>
          </h1>

          <p>
            We transform ambitious ideas into powerful
            digital experiences through innovative
            technology and creative design.
          </p>

          <div className="hero-buttons">
            <a href="/contact" className="primary-button">
              Start a Project ↗
            </a>

            <a href="/services" className="secondary-button">
              Explore Services →
            </a>
          </div>

        </div>

        <div className="hero-visual">
          <div className="visual-circle">
            <div className="visual-inner">
              <span>N</span>
              <p>IDEAS IN MOTION</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <span className="section-label">WHO WE ARE</span>
        <h2>Technology with a purpose.</h2>
        <p>
          We help businesses grow through technology,
          creativity and innovation.
        </p>
      </section>
      <Testimonials />
      <FAQ />
    </>
  );
}
