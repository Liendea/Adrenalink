import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./EditProfile.scss";

type ProfileForm = {
  firstName: string;
  lastName: string;
  passportNo: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
};

export default function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<ProfileForm>({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    passportNo: user?.passportNo ?? "",
    address: user?.address ?? "",
    zipCode: user?.zipCode ?? "",
    city: user?.city ?? "",
    country: user?.country ?? "",
    phoneCode: user?.phoneCode ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    email: user?.email ?? "",
  });

  const handleChange =
    (field: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = async () => {
    // TODO: PUT /api/users/:id med form-datan
    navigate("/profile");
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile__header">
        <button
          className="edit-profile__back"
          onClick={() => navigate("/profile")}
        >
          ‹ Back
        </button>
        <h1>Edit Profile</h1>
      </div>

      {/* Avatar */}
      <div className="edit-profile__avatar-row">
        <div className="edit-profile__avatar">
          <span>
            {user?.firstName[0]}
            {user?.lastName[0]}
          </span>
          <button className="edit-profile__avatar-add">+</button>
        </div>
        <span className="edit-profile__fullname">
          {user?.firstName} {user?.lastName}
        </span>
      </div>

      {/* Personal info */}
      <section className="edit-profile__section">
        <h2 className="edit-profile__section-title">Personal info</h2>
        <div className="edit-profile__field">
          <label>First Name</label>
          <input value={form.firstName} onChange={handleChange("firstName")} />
        </div>
        <div className="edit-profile__field">
          <label>Last Name</label>
          <input value={form.lastName} onChange={handleChange("lastName")} />
        </div>
        <div className="edit-profile__field">
          <label>Passport number</label>
          <input
            value={form.passportNo}
            onChange={handleChange("passportNo")}
          />
        </div>
      </section>

      {/* Address */}
      <section className="edit-profile__section">
        <h2 className="edit-profile__section-title">Address</h2>
        <div className="edit-profile__field">
          <label>Street</label>
          <input value={form.address} onChange={handleChange("address")} />
        </div>
        <div className="edit-profile__field-row">
          <div className="edit-profile__field">
            <label>Zip</label>
            <input value={form.zipCode} onChange={handleChange("zipCode")} />
          </div>
          <div className="edit-profile__field">
            <label>City</label>
            <input value={form.city} onChange={handleChange("city")} />
          </div>
        </div>
        <div className="edit-profile__field">
          <label>Country</label>
          <input value={form.country} onChange={handleChange("country")} />
        </div>
      </section>

      {/* Contact */}
      <section className="edit-profile__section">
        <h2 className="edit-profile__section-title">Contact</h2>
        <div className="edit-profile__field-row">
          <div className="edit-profile__field">
            <label>Country code</label>
            <input
              value={form.phoneCode}
              onChange={handleChange("phoneCode")}
            />
          </div>
          <div className="edit-profile__field">
            <label>Phone number</label>
            <input
              value={form.phoneNumber}
              onChange={handleChange("phoneNumber")}
            />
          </div>
        </div>
        <div className="edit-profile__field">
          <label>Email</label>
          <input value={form.email} onChange={handleChange("email")} />
        </div>
      </section>

      <button className="edit-profile__save" onClick={handleSave}>
        Save changes
      </button>
    </div>
  );
}
