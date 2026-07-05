import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import SigninIcon from "@/assets/icons/SigninIcon.svg";
import ExitIcon from "@/assets/icons/ExitIcon.svg";
import MoreIcon from "@/assets/icons/MoreIcon.svg";
import QuestionIcon from "@/assets/icons/Question_white.svg";
import { useNavigate } from "react-router-dom";
import useClickOutside from "@/hooks/useClickOutside";
import type { User } from "@/types/types";
import "./Navigation_Actions.scss";

type NavActionsProps = {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
};

export default function Navigation_Actions({
  isAuthenticated,
  user,
  logout,
}: NavActionsProps) {
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useClickOutside(moreRef, () => setMoreOpen(false));

  const handleLogout = () => {
    setMoreOpen(false);
    logout();
  };

  return (
    <div className="navigation__actions">
      {!isAuthenticated ? (
        <>
          {/* Register and Sign in buttons for unauthenticated users */}
          <button
            className="btn navigation__actions__register"
            onClick={() => navigate("/register")}
          >
            Get started!
          </button>

          <button
            className="btn navigation__actions__sign-in"
            onClick={() => navigate("/login")}
          >
            <Icon src={SigninIcon} />
            Sign in
          </button>
        </>
      ) : (
        <button
          className="btn navigation__actions__profile"
          onClick={() => navigate("/profile")}
        >
          <span className="navigation__actions__welcome">
            Hello, {user?.firstName}!
          </span>
          <div className="navigation__actions__my-profile">
            <Icon src={SigninIcon} />
            My Profile
          </div>
        </button>
      )}

      {/* More-knapp + dropdown */}
      <div className="navigation__actions__more" ref={moreRef}>
        <button
          className="btn navigation__actions__more-btn"
          onClick={() => setMoreOpen((open) => !open)}
        >
          <Icon src={MoreIcon} />
          More
        </button>

        {moreOpen && (
          <div className="navigation__actions__more-dropdown">
            <button className="navigation__actions__more-dropdown__item">
              <Icon src={QuestionIcon} width={20} height={20} />
              FAQ
            </button>
            {isAuthenticated && (
              <button
                className="navigation__actions__more-dropdown__item"
                onClick={handleLogout}
              >
                <Icon src={ExitIcon} height={20} width={20} />
                Sign out
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
