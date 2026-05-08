import Icon from "@/components/Icon";
import AdrenalinkLogo from "@/assets/icons/AdrenalinkLogo.svg";
import AdrenalinkLogo_Dark from "@/assets/icons/AdrenalinkLogo_dark.svg";
import SigninIcon from "@/assets/icons/SigninIcon.svg";
import ExitIcon from "@/assets/icons/ExitIcon.svg";
import MoreIcon from "@/assets/icons/moreIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./Navigation.scss";
import Searchbar from "../searchbar/Searchbar";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav
      className="navigation"
      style={{
        backgroundColor: ["/", "/register", "/login"].includes(
          location.pathname,
        )
          ? "transparent"
          : "#f6f6f6",
      }}
    >
      <a className="navigation__logo" href="/">
        <Icon
          src={location.pathname !== "/" ? AdrenalinkLogo_Dark : AdrenalinkLogo}
          width={200}
          height={100}
        />
      </a>

      {location.pathname !== "/" && <Searchbar />}

      <div className="navigation__actions">
        {!isAuthenticated ? (
          <>
            <button
              className="navigation__cta"
              onClick={() => navigate("/register")}
            >
              Create account
            </button>
            <button
              className="navigation__icon-btn"
              onClick={() => navigate("/login")}
            >
              <Icon src={SigninIcon} />
              Sign in
            </button>
          </>
        ) : (
          <>
            <button
              className="navigation__icon-btn"
              onClick={() => navigate("/profile")}
            >
              <span className="navigation__welcome">
                Hello, {user.firstName}!
              </span>
              <div className="navigation__profile">
                <Icon src={SigninIcon} />
                My Profile
              </div>
            </button>
            <button className="navigation__icon-btn" onClick={logout}>
              <div className="navigation__exit">
                <Icon src={ExitIcon} height={25} width={25} /> Sign out
              </div>
            </button>
          </>
        )}
        <button className="navigation__icon-btn">
          <Icon src={MoreIcon} />
          More
        </button>
      </div>
    </nav>
  );
}
