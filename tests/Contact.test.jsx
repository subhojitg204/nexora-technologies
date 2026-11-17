
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from "vitest";
import Contact from '../src/pages/Contact/Contact';

describe('Nexora Technologies Contact Form', () => {

  it('renders the contact page heading', () => {
    render(<Contact />);

    expect(
      screen.getByRole('heading', {
        name: "Let's build something amazing.",
      })
    ).toBeInTheDocument();
  });

  it('displays all five form fields', () => {
    render(<Contact />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Message')).toBeInTheDocument();
  });

  it('marks the required fields correctly', () => {
    render(<Contact />);

    expect(screen.getByLabelText('Full Name')).toBeRequired();
    expect(screen.getByLabelText('Email Address')).toBeRequired();
    expect(screen.getByLabelText('Subject')).toBeRequired();
    expect(screen.getByLabelText('Your Message')).toBeRequired();

    expect(
      screen.getByLabelText('Phone Number (Optional)')
    ).not.toBeRequired();
  });

  it('allows users to enter form information', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText('Full Name'), 'Rahul Sharma');
    await user.type(screen.getByLabelText('Email Address'), 'rahul@example.com');
    await user.type(screen.getByLabelText('Subject'), 'Website Development');
    await user.type(screen.getByLabelText('Your Message'), 'I need a business website.');

    expect(screen.getByLabelText('Full Name')).toHaveValue('Rahul Sharma');
    expect(screen.getByLabelText('Email Address')).toHaveValue('rahul@example.com');
    expect(screen.getByLabelText('Subject')).toHaveValue('Website Development');
    expect(screen.getByLabelText('Your Message')).toHaveValue('I need a business website.');
  });

  it('prevents submission when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByLabelText('Full Name').validity.valueMissing).toBe(true);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('rejects invalid email addresses', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText('Full Name'), 'Rahul Sharma');
    await user.type(screen.getByLabelText('Email Address'), 'invalid-email');
    await user.type(screen.getByLabelText('Subject'), 'Project Inquiry');
    await user.type(screen.getByLabelText('Your Message'), 'Please contact me.');

    const email = screen.getByLabelText('Email Address');

    expect(email.validity.typeMismatch).toBe(true);

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('shows success and clears fields after valid submission', async () => {
   
const originalFetch = globalThis.fetch;

globalThis.fetch = vi.fn().mockResolvedValue({
  ok: true,
  status: 201,
  json: async () => ({
    success: true,
    message: "Message submitted successfully.",
  }),
});

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText('Full Name'), 'Rahul Sharma');
    await user.type(screen.getByLabelText('Email Address'), 'rahul@example.com');
    await user.type(screen.getByLabelText('Subject'), 'Website Project');
    await user.type(screen.getByLabelText('Your Message'), 'I want a new website.');

    await user.click(screen.getByRole('button', { name: 'Send Message' }));

 
expect(
  await screen.findByRole("status")
).toHaveTextContent(
  "Thank you! Your message has been submitted."
);


    expect(screen.getByLabelText('Full Name')).toHaveValue('');
    expect(screen.getByLabelText('Email Address')).toHaveValue('');
    expect(screen.getByLabelText('Subject')).toHaveValue('');
    expect(screen.getByLabelText('Your Message')).toHaveValue('');
    globalThis.fetch = originalFetch;
  });

});
