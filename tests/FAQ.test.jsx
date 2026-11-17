
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import FAQ from '../src/components/FAQ/FAQ';

describe('Nexora Technologies FAQ Component', () => {

  it('renders the FAQ heading', () => {
    render(<FAQ />);

    expect(
      screen.getByRole('heading', {
        name: 'Frequently Asked Questions',
      })
    ).toBeInTheDocument();
  });

  it('displays all five FAQ questions', () => {
    render(<FAQ />);

    const questions = screen.getAllByRole('button');

    expect(questions).toHaveLength(5);
  });

  it('expands an answer when a question is clicked', async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const question = screen.getByRole('button', {
      name: /What services does NEXORA Technologies provide/i,
    });

    expect(question).toHaveAttribute('aria-expanded', 'false');

    await user.click(question);

    expect(question).toHaveAttribute('aria-expanded', 'true');

    expect(
      screen.getByText(/We provide web development/i)
    ).toBeInTheDocument();
  });

  it('collapses an answer when clicked again', async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const question = screen.getByRole('button', {
      name: /Do you provide technical support/i,
    });

    await user.click(question);

    expect(question).toHaveAttribute('aria-expanded', 'true');

    await user.click(question);

    expect(question).toHaveAttribute('aria-expanded', 'false');

    expect(
      screen.queryByText(/We can provide ongoing maintenance/i)
    ).not.toBeInTheDocument();
  });

  it('closes the previous answer when another question opens', async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const firstQuestion = screen.getByRole('button', {
      name: /How long does it take to complete a project/i,
    });

    const secondQuestion = screen.getByRole('button', {
      name: /Can I request a customized website/i,
    });

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    await user.click(secondQuestion);

    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getAllByRole('region')).toHaveLength(1);
  });

});
