
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.home-services, .home-projects, .home-cta'
    );

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.classList.add('reveal-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
