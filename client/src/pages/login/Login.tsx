import useLogin from "@/hooks/useLogin";
import "./Login.scss";

export default function Login() {
  const { handleSubmit, handleChange, formData } = useLogin();

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

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
        <button className="submit-btn" onClick={handleSubmit}>
          Sign in
        </button>
      </div>
    </div>
  );
}
