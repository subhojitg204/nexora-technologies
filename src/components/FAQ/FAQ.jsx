
import { useState } from 'react';

const questions = [
  {
    question: 'What services does NEXORA Technologies provide?',
    answer: 'We provide web development, UI/UX design, mobile app development, cloud solutions, digital marketing and IT consulting.'
  },
  {
    question: 'How long does it take to complete a project?',
    answer: 'Project timelines depend on the requirements and complexity. A typical website project may take 2 to 6 weeks.'
  },
  {
    question: 'Can I request a customized website?',
    answer: 'Yes! We create customized digital solutions based on your business requirements and goals.'
  },
  {
    question: 'Do you provide technical support?',
    answer: 'Yes. We can provide ongoing maintenance, updates and technical support for completed projects.'
  },
  {
    question: 'How can I get a project quotation?',
    answer: 'You can contact us through our Contact page with your project details to discuss an estimated quotation.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="faq-section">
      <span className="section-label">FAQ</span>

      <h2>Frequently Asked Questions</h2>

      <p>Find answers to common questions about our services.</p>

      <div className="faq-list">
        {questions.map((item, index) => (
          <div className="faq-item" key={index}>
            <button
              className="faq-question"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {item.question}
              <span>{activeIndex === index ? '−' : '+'}</span>
            </button>

            {activeIndex === index && (
              <div
                className="faq-answer"
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
