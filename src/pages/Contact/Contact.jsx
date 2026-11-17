
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setSubmitted(false);
  };


const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send message');
    }

    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

  } catch (error) {
    console.error('Contact form error:', error);
    setSubmitted(false);
    alert(error.message || 'Something went wrong. Please try again.');
  }
};

  return (
    <section className="content-section page-content contact-page">
      <span className="section-label">GET IN TOUCH</span>

      <h2>Let's build something amazing.</h2>

      <p>
        Have a project in mind? Contact our team and let's discuss
        how we can help your business grow.
      </p>

      <div className="contact-container">
        <div className="contact-details">
          <h3>Contact Information</h3>

          <p><strong>Email:</strong> hello@nexora.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> India</p>

          <p className="contact-note">
            Fill out the form and our team will be ready to discuss
            your project.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number (Optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Enter the subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-button">
            Send Message
          </button>

          <p className="success-message" role="status" aria-live="polite">
            {submitted ? 'Thank you! Your message has been submitted.' : ''}
          </p>
        </form>
      </div>
    </section>
  );
}
