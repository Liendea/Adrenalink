import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./UserProfile.scss";
import ProfileImageUpload from "@/components/profileImage/ProfileImageUpload";
import settingsIcon from "@/assets/icons/settingsIcon.svg";
import Icon from "@/components/Icon";

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const menuItems = [
    { label: "My Bookings", icon: "📅", path: "/profile/bookings" },
    { label: "My Favorites", icon: "❤️", path: "/profile/favorites" },
  ];

  return (
    <section className="profile">
      <div className="profile__header">
        <h1 className="profile__title">Profile</h1>
        <button
          className="profile__edit-btn"
          onClick={() => navigate("/profile/edit")}
        >
          <Icon src={settingsIcon} width={15} height={15} /> Edit
        </button>
      </div>

      {/* Avatar + name */}
      <div className="profile__hero">
        <ProfileImageUpload />
        <h2 className="profile__name">
          {user.firstName} {user.lastName}
        </h2>
      </div>

      {/* Info card */}
      <div className="profile__info-card">
        <div className="profile__info-row">
          <span className="profile__info-label">Passport number:</span>
          <span className="profile__info-value">{user.passportNo}</span>
        </div>
        <hr className="profile__divider" />
        <div className="profile__info-row">
          <span className="profile__info-label">Address:</span>
          <span className="profile__info-value">
            {user.address}
            <br />
            {user.zipCode} {user.city}
            <br />
            {user.country}
          </span>
        </div>
        <hr className="profile__divider" />
        <div className="profile__info-row">
          <span className="profile__info-label">Phone:</span>
          <span className="profile__info-value">
            {user.phoneCode} {user.phoneNumber}
          </span>
        </div>
        <hr className="profile__divider" />
        <div className="profile__info-row">
          <span className="profile__info-label">Email:</span>
          <span className="profile__info-value">{user.email}</span>
        </div>
      </div>

      {/* Menu items */}
      <div className="profile__menu">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className="profile__menu-item"
            onClick={() => navigate(item.path)}
          >
            <span className="profile__menu-icon">{item.icon}</span>
            <span className="profile__menu-label">{item.label}</span>
            <span className="profile__menu-arrow">›</span>
          </button>
        ))}
      </div>
    </section>
  );
}
