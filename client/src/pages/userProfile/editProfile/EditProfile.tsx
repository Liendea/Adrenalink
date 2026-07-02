import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./EditProfile.scss";
import CountryInput from "@/pages/userProfile/components/inputs/CountryInput";
import { PHONE_CODES } from "@/pages/userProfile/editProfile/utils/CountryPhoneCodes";
import useEditProfile from "@/hooks/useEditProfile";
import Back_Btn from "@/components/buttons/Back_Btn";

type ProfileForm = {
  firstName: string;
  lastName: string;
  passportNumber: string;
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
  const { saveProfile, loading, error } = useEditProfile();

  const [form, setForm] = useState<ProfileForm>({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    passportNumber: user?.passportNumber ?? "",
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
    await saveProfile(form);
    if (!error) navigate("/profile");
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile__header">
        <Back_Btn onClick={() => navigate("/profile")} />
        <h1>Edit Profile</h1>
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
            value={form.passportNumber}
            onChange={handleChange("passportNumber")}
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
          <CountryInput
            value={form.country}
            onChange={(val) => setForm((prev) => ({ ...prev, country: val }))}
          />
        </div>
      </section>

      {/* Contact */}
      <section className="edit-profile__section">
        <h2 className="edit-profile__section-title">Contact</h2>
        <div className="edit-profile__field-row">
          <div className="edit-profile__field">
            <label>Country code</label>
            <select
              value={form.phoneCode}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phoneCode: e.target.value }))
              }
              className="edit-profile__select"
            >
              {PHONE_CODES.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.code} {p.country}
                </option>
              ))}
            </select>
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

      {error && <p className="edit-profile__error">{error}</p>}

      <button
        className="edit-profile__save"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
