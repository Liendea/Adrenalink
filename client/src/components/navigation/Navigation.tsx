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
import AdrenalinkLogo_small from "@/assets/icons/AdrenalinkLogo_small.svg";

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
        borderBottom: ["/", "/register", "/login"].includes(location.pathname)
          ? "none"
          : "1px solid lightgray",
      }}
    >
      <div className="navigation__group1">
        <div className="navigation__logo">
          <a href="/">
            {/* Stor logga – desktop */}
            <div className="navigation__logo--large">
              <Icon
                src={
                  location.pathname !== "/"
                    ? AdrenalinkLogo_Dark
                    : AdrenalinkLogo
                }
                width={200}
                height={100}
              />
            </div>
            {/* Liten logga – mobil/tablet */}
            <div className="navigation__logo--small">
              <Icon src={AdrenalinkLogo_small} width={50} height={50} />
            </div>
          </a>
        </div>

        {location.pathname !== "/" && (
          <div className="navigation__searchbar2">
            <Searchbar />
          </div>
        )}

        <div className="navigation__actions">
          {!isAuthenticated ? (
            <>
              {/* Registrera */}
              <button
                className="navigation__register"
                onClick={() => navigate("/register")}
              >
                Create account
              </button>

              {/* Logga in */}
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
              {/* Hälsning + namn + min profil ikon */}
              <button
                className="navigation__icon-btn"
                onClick={() => navigate("/profile")}
              >
                {/* Hälsning + namn  */}
                <span className="navigation__welcome">
                  Hello, {user.firstName}!
                </span>
                {/* ----------------------------- */}

                {/* Min profil + icon */}
                <div className="navigation__profile">
                  <Icon src={SigninIcon} />
                  My Profile
                </div>
                {/* ----------------------------- */}
              </button>

              {/* Logga ut + icon*/}
              <button className="navigation__icon-btn" onClick={logout}>
                <div className="navigation__exit">
                  <Icon src={ExitIcon} height={25} width={25} /> Sign out
                </div>
              </button>
              {/* ----------------------------- */}
            </>
          )}

          {/* More knapp */}
          <button className="navigation__icon-btn">
            <Icon src={MoreIcon} />
            More
          </button>
          {/* ----------------------------- */}
        </div>
      </div>

      {location.pathname !== "/" && (
        <div className="navigation__searchbar smaller-screens">
          <Searchbar />
        </div>
      )}
    </nav>
  );
}
