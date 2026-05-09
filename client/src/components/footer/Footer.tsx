// Footer.tsx
import "./Footer.scss";
import { Link } from "react-router-dom";
import AdrenalinkLogo from "@/assets/icons/AdrenalinkLogo_dark.svg";
import Icon from "@/components/Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand kolumn */}
        <div className="footer__brand">
          <Icon src={AdrenalinkLogo} width={160} height={60} />
          <p className="footer__tagline">
            The world's first booking platform for extreme sports lessons. Find
            your next adventure — surf, kite, climb, shred.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social">
              Instagram
            </a>
            <a href="#" className="footer__social">
              TikTok
            </a>
            <a href="#" className="footer__social">
              YouTube
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer__col">
          <h4 className="footer__col-title">Explore</h4>
          <ul className="footer__links">
            <li>
              <Link to="/explore">All activities</Link>
            </li>
            <li>
              <Link to="/explore?tab=schools">Schools</Link>
            </li>
            <li>
              <Link to="/explore?tab=rentals">Rentals</Link>
            </li>
            <li>
              <Link to="/explore?country=Portugal">Portugal</Link>
            </li>
            <li>
              <Link to="/explore?country=Spain">Spain</Link>
            </li>
            <li>
              <Link to="/explore?country=France">France</Link>
            </li>
            <li>
              <Link to="/explore?country=Sweden">Sweden</Link>
            </li>
          </ul>
        </div>

        {/* Sports */}
        <div className="footer__col">
          <h4 className="footer__col-title">Sports</h4>
          <ul className="footer__links">
            <li>
              <a href="#">Surf</a>
            </li>
            <li>
              <a href="#">Kitesurf</a>
            </li>
            <li>
              <a href="#">Windsurf</a>
            </li>
            <li>
              <a href="#">Snowboard</a>
            </li>
            <li>
              <a href="#">Wakeboard</a>
            </li>
            <li>
              <a href="#">Climbing</a>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className="footer__col">
          <h4 className="footer__col-title">Account</h4>
          <ul className="footer__links">
            <li>
              <Link to="/profile">My profile</Link>
            </li>
            <li>
              <Link to="/profile/bookings">My bookings</Link>
            </li>
            <li>
              <Link to="/profile/favorites">My favorites</Link>
            </li>
            <li>
              <Link to="/register">Create account</Link>
            </li>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer__col">
          <h4 className="footer__col-title">Company</h4>
          <ul className="footer__links">
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">For schools</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Adrenalink AB. All rights reserved.</p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
