import Icon from "@/components/Icon";
import AdrenalinkLogo from "@/assets/icons/AdrenalinkLogo.svg";
import SigninIcon from "@/assets/icons/SigninIcon.svg";
import ExitIcon from "@/assets/icons/ExitIcon.svg";
import MoreIcon from "@/assets/icons/moreIcon.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./Navigation.scss";

export default function Navigation() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="landing__nav">
      <a className="landing__logo" href="#">
        <Icon src={AdrenalinkLogo} width={200} height={100} />
      </a>
      <div className="landing__nav-actions">
        {!isAuthenticated ? (
          // VISA DETTA OM UTLOGGAD
          <>
            <button
              className="landing__nav-cta"
              onClick={() => navigate("/register")}
            >
              Create account
            </button>
            <button
              className="landing__nav-icon-btn"
              onClick={() => navigate("/login")}
            >
              <Icon src={SigninIcon} />
              Sign in
            </button>
          </>
        ) : (
          // VISA DETTA OM INLOGGAD
          <>
            <button className="landing__nav-icon-btn" onClick={logout}>
              <span className="user-welcome">Hej, {user.firstName}!</span>
              <div>
                <Icon src={ExitIcon} height={25} width={25} /> Sign out{" "}
              </div>
            </button>
          </>
        )}
        <button className="landing__nav-icon-btn">
          <Icon src={MoreIcon} />
          More
        </button>
      </div>
    </nav>
  );
}
