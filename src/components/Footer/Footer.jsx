
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">

      <Link to="/" className="logo">
        NEXORA<span>.</span>
      </Link>

      <p>
        Building digital experiences for tomorrow.
      </p>

      <p>
        © {new Date().getFullYear()} Nexora Technologies.
        All rights reserved.
      </p>

    </footer>
  );
}
