
import { useState } from 'react';

const testimonials = [
  {
    name: 'Alex Morgan',
    role: 'Business Owner',
    company: 'Digital Business',
    rating: 5,
    message: 'The team delivered a clean and professional website experience. The entire process was smooth and well organised.'
  },
  {
    name: 'Sophia Williams',
    role: 'Startup Founder',
    company: 'Creative Startup',
    rating: 5,
    message: 'Their creative approach and attention to detail helped us shape our online presence.'
  },
  {
    name: 'Daniel Smith',
    role: 'Marketing Manager',
    company: 'Modern Solutions',
    rating: 5,
    message: 'A responsive team with a strong understanding of modern design and development.'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const previousReview = () => {
    setActiveIndex((previous) =>
      previous === 0 ? testimonials.length - 1 : previous - 1
    );
  };

  const nextReview = () => {
    setActiveIndex((previous) =>
      (previous + 1) % testimonials.length
    );
  };

  const review = testimonials[activeIndex];

  return (
    <section className="testimonials-section">
      <span className="section-label">CLIENT FEEDBACK</span>

      <h2>What People Say About Us</h2>

      <p className="testimonials-subtitle">
        Discover what our customers think about our work.
      </p>

      <div className="testimonial-card" aria-live="polite">
        <div className="testimonial-stars" aria-label={`${review.rating} out of 5 stars`}>
          {'★'.repeat(review.rating)}
        </div>

        <p className="testimonial-message">
          "{review.message}"
        </p>

        <h3>{review.name}</h3>

        <span className="testimonial-role">
          {review.role} · {review.company}
        </span>

        <div className="testimonial-controls">
          <button onClick={previousReview} aria-label="Previous review">
            ←
          </button>

          <span>
            {activeIndex + 1} / {testimonials.length}
          </span>

          <button onClick={nextReview} aria-label="Next review">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
