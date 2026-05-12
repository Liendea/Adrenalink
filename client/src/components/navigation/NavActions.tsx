import Icon from "@/components/Icon";
import SigninIcon from "@/assets/icons/SigninIcon.svg";
import ExitIcon from "@/assets/icons/ExitIcon.svg";
import MoreIcon from "@/assets/icons/MoreIcon.svg";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/types";

type NavActionsProps = {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
};

export default function NavActions({
  isAuthenticated,
  user,
  logout,
}: NavActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="navigation__actions">
      {!isAuthenticated ? (
        <>
          <button
            className="navigation__actions__register"
            onClick={() => navigate("/register")}
          >
            Get started!
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
              Hello, {user?.firstName}!
            </span>
            <div className="navigation__profile">
              <Icon src={SigninIcon} />
              My Profile
            </div>
          </button>
          <button className="navigation__icon-btn" onClick={logout}>
            <div className="navigation__exit">
              <Icon src={ExitIcon} height={25} width={25} />
              Sign out
            </div>
          </button>
        </>
      )}
      <button className="navigation__icon-btn">
        <Icon src={MoreIcon} />
        More
      </button>
    </div>
  );
}
