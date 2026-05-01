import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Auth.css";

export default function Register() {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = e => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const validate = () => {
    if (form.password.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।";
    if (!/[A-Z]/.test(form.password)) return "পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে।";
    if (!/[a-z]/.test(form.password)) return "পাসওয়ার্ডে কমপক্ষে একটি ছোট হাতের অক্ষর থাকতে হবে।";
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      await register(form);
      toast.success("নিবন্ধন সফল! এখন লগইন করুন। 🎉");
      navigate("/login");
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
      toast.success("Google দিয়ে সফলভাবে নিবন্ধিত হয়েছে! 🎉");
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
          <h2>আজই যোগ দিন</h2>
          <p>বিনামূল্যে অ্যাকাউন্ট খুলুন এবং সেরা পশু বেছে নিন।</p>
          <div className="auth-features">
            <div className="auth-feat"><span>🎯</span> সহজ বুকিং প্রক্রিয়া</div>
            <div className="auth-feat"><span>📞</span> ২৪/৭ সাপোর্ট</div>
            <div className="auth-feat"><span>💳</span> নিরাপদ পেমেন্ট</div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box animate__animated animate__fadeInUp">
          <div className="auth-icon">📝</div>
          <h1 className="auth-title">নিবন্ধন করুন</h1>
          <p className="auth-sub">নতুন অ্যাকাউন্ট তৈরি করুন</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>পূর্ণ নাম</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="আপনার নাম" required />
            </div>
            <div className="form-group">
              <label>ইমেইল</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="আপনার ইমেইল" required />
            </div>
            <div className="form-group">
              <label>ফটো URL (ঐচ্ছিক)</label>
              <input name="photoURL" value={form.photoURL} onChange={handleChange} placeholder="https://example.com/photo.jpg" />
            </div>
            <div className="form-group pass-group">
              <label>পাসওয়ার্ড</label>
              <input
                name="password" type={showPass ? "text" : "password"} value={form.password}
                onChange={handleChange} placeholder="শক্তিশালী পাসওয়ার্ড দিন" required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            <p className="pass-hint">পাসওয়ার্ডে বড় হাতের অক্ষর, ছোট হাতের অক্ষর এবং সর্বনিম্ন ৬টি অক্ষর থাকতে হবে।</p>

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন করুন →"}
            </button>
          </form>

          <div className="auth-divider"><span>অথবা</span></div>

          <button className="google-btn" onClick={handleGoogle}>
            <img src="https://www.google.com/favicon.ico" alt="Google" width="18" />
            Google দিয়ে নিবন্ধন করুন
          </button>

          <p className="auth-switch">
            অ্যাকাউন্ট আছে? <Link to="/login">লগইন করুন</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
