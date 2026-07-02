import useRegister from "@/hooks/useRegister";
import "./Register.scss";

export default function Register() {
  const { step, formData, handleChange, handleNext, handleBack, handleSubmit } =
    useRegister();

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create account</h2>
        <p>Step {step} / 3</p>

        {step === 1 && (
          <div className="step-fade">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="form-group">
              <label>Repeat password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-fade">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <div className="row">
                <input
                  className="small-input"
                  placeholder="+46"
                  name="phoneCode"
                  onChange={handleChange}
                  value={formData.phoneCode}
                />
                <input
                  className="large-input"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Passport nr</label>
              <input
                type="text"
                name="passportNo"
                onChange={handleChange}
                value={formData.passportNo}
              />
            </div>
            <div className="step-buttons">
              <button className="back-btn" onClick={handleBack}>
                Back
              </button>
              <button className="next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-fade">
            <div className="form-group">
              <label>Adress</label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address}
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="small-input">
                  <label>Zip</label>
                  <input
                    type="text"
                    name="zipCode"
                    onChange={handleChange}
                    value={formData.zipCode}
                  />
                </div>
                <div className="large-input">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                onChange={handleChange}
                value={formData.country}
              />
            </div>
            <div className="step-buttons">
              <button className="back-btn" onClick={handleBack}>
                Back
              </button>
              <button className="next-btn" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
