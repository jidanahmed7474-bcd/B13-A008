import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Auth.css";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = e => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      toast.success("স্বাগতম! সফলভাবে লগইন হয়েছে। 🎉");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google দিয়ে সফলভাবে লগইন হয়েছে! 🎉");
      navigate("/");
    } catch {
      toast.error("Google লগইন ব্যর্থ হয়েছে।");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-brand">🐄 QurbaniHat</div>
          <h2>বিশ্বস্ত কুরবানির পশুর বাজার</h2>
          <p>অনলাইনে সহজে পশু বুক করুন, নিরাপদে কুরবানি দিন।</p>
          <div className="auth-features">
            <div className="auth-feat"><span>✅</span> ১০০% যাচাইকৃত পশু</div>
            <div className="auth-feat"><span>🚚</span> হোম ডেলিভারি</div>
            <div className="auth-feat"><span>🔒</span> নিরাপদ লেনদেন</div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box animate__animated animate__fadeInUp">
          <div className="auth-icon">🔑</div>
          <h1 className="auth-title">লগইন করুন</h1>
          <p className="auth-sub">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>ইমেইল</label>
              <input
                name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="আপনার ইমেইল" required
              />
            </div>
            <div className="form-group pass-group">
              <label>পাসওয়ার্ড</label>
              <input
                name="password" type={showPass ? "text" : "password"} value={form.password}
                onChange={handleChange} placeholder="আপনার পাসওয়ার্ড" required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? "লগইন হচ্ছে..." : "লগইন করুন →"}
            </button>
          </form>

          <div className="auth-divider"><span>অথবা</span></div>

          <button className="google-btn" onClick={handleGoogle}>
            <img src="https://www.google.com/favicon.ico" alt="Google" width="18" />
            Google দিয়ে লগইন করুন
          </button>

          <p className="auth-switch">
            অ্যাকাউন্ট নেই? <Link to="/register">নিবন্ধন করুন</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
