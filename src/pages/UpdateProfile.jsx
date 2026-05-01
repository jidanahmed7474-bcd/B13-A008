import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Profile.css";

export default function UpdateProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", photoURL: user?.photoURL || "" });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(user?.photoURL || "");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "photoURL") setPreview(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("নাম খালি রাখা যাবে না।"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    updateProfile({ name: form.name, photoURL: form.photoURL });
    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে! ✅");
    navigate("/profile");
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <div className="update-page">
        <div className="container">
          <div className="update-box animate__animated animate__fadeInUp">
            <div className="update-header">
              <div className="update-header-icon">✏️</div>
              <h1>তথ্য আপডেট করুন</h1>
              <p>আপনার নাম ও প্রোফাইল ছবি পরিবর্তন করুন</p>
            </div>

            {/* Preview */}
            <div className="update-preview">
              {preview ? (
                <img src={preview} alt="Preview" className="update-preview-img" onError={() => setPreview("")} />
              ) : (
                <div className="update-preview-placeholder">
                  {form.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="update-preview-name">{form.name || "আপনার নাম"}</div>
            </div>

            <form onSubmit={handleSubmit} className="update-form">
              <div className="form-group">
                <label>নতুন নাম *</label>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="আপনার নাম লিখুন" required
                />
              </div>
              <div className="form-group">
                <label>ছবির URL (Photo URL)</label>
                <input
                  name="photoURL" value={form.photoURL} onChange={handleChange}
                  placeholder="https://example.com/your-photo.jpg"
                />
                <small style={{ color: "var(--text-muted)", fontSize: 12 }}>
                  একটি সঠিক ছবির লিঙ্ক দিন। উপরে প্রিভিউ দেখতে পাবেন।
                </small>
              </div>

              <div className="update-btns">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "আপডেট হচ্ছে..." : "✅ আপডেট করুন"}
                </button>
                <button type="button" className="btn-outline" onClick={() => navigate("/profile")}>
                  বাতিল করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
