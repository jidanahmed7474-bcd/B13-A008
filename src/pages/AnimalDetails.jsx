import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { animals } from "../data/animals";
import toast from "react-hot-toast";
import "./AnimalDetails.css";

export default function AnimalDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const animal = animals.find(a => a.id === parseInt(id));

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  if (!animal) {
    return (
      <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 60 }}>🐄</div>
          <h2>পশু পাওয়া যায়নি!</h2>
          <Link to="/animals" className="btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
            ← ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error("বুকিং করতে লগইন করুন!"); navigate("/login"); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success(`🎉 "${animal.name}" সফলভাবে বুক করা হয়েছে! শীঘ্রই যোগাযোগ করা হবে।`, { duration: 5000 });
    setForm({ name: "", email: "", phone: "", address: "" });
    setSubmitting(false);
  };

  return (
    <div className="page-wrapper">
      <div className="details-page">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>›</span>
            <Link to="/animals">সকল পশু</Link>
            <span>›</span>
            <span>{animal.name}</span>
          </div>

          <div className="details-grid">
            {/* Left: Image & Info */}
            <div className="details-left">
              <div className="detail-img-wrap">
                <img src={animal.image} alt={animal.name} className="detail-img" />
                <div className="detail-badges">
                  <span className={`badge ${animal.type === "Cow" ? "badge-green" : "badge-gold"}`}>
                    {animal.type === "Cow" ? "🐄 গরু" : "🐐 ছাগল"}
                  </span>
                  <span className={`badge ${animal.available ? "badge-green" : "badge-red"}`}>
                    {animal.available ? "✅ পাওয়া যাচ্ছে" : "❌ বুকড"}
                  </span>
                </div>
              </div>

              <div className="detail-card">
                <h1 className="detail-name">{animal.name}</h1>
                <p className="detail-breed">{animal.breed} · 📍 {animal.location}</p>

                <div className="detail-price-wrap">
                  <span className="detail-price-label">মূল্য</span>
                  <span className="detail-price">৳{animal.price.toLocaleString("bn-BD")}</span>
                </div>

                <div className="detail-specs">
                  <div className="spec-item">
                    <span className="spec-icon">⚖️</span>
                    <div>
                      <span className="spec-label">ওজন</span>
                      <span className="spec-val">{animal.weight} কেজি</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">📅</span>
                    <div>
                      <span className="spec-label">বয়স</span>
                      <span className="spec-val">{animal.age} বছর</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">🏷️</span>
                    <div>
                      <span className="spec-label">ক্যাটেগরি</span>
                      <span className="spec-val">{animal.category}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">📍</span>
                    <div>
                      <span className="spec-label">অবস্থান</span>
                      <span className="spec-val">{animal.location}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-desc">
                  <h3>বিবরণ</h3>
                  <p>{animal.description}</p>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="details-right">
              <div className="booking-card">
                <div className="booking-header">
                  <h2>📋 বুকিং ফর্ম</h2>
                  <p>এই পশুটি বুক করতে নিচের ফর্ম পূরণ করুন</p>
                </div>

                {!user ? (
                  <div className="login-prompt">
                    <div className="lock-icon">🔒</div>
                    <h3>লগইন প্রয়োজন</h3>
                    <p>বুকিং করতে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।</p>
                    <Link to="/login" className="btn-primary" style={{ marginTop: 16, display: "inline-flex" }}>
                      লগইন করুন
                    </Link>
                    <p style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}>
                      অ্যাকাউন্ট নেই? <Link to="/register" style={{ color: "var(--green)", fontWeight: 700 }}>নিবন্ধন করুন</Link>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                      <label>আপনার নাম *</label>
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        placeholder="পূর্ণ নাম লিখুন" required
                      />
                    </div>
                    <div className="form-group">
                      <label>ইমেইল *</label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="আপনার ইমেইল" required
                      />
                    </div>
                    <div className="form-group">
                      <label>মোবাইল নম্বর *</label>
                      <input
                        name="phone" type="tel" value={form.phone} onChange={handleChange}
                        placeholder="01XXXXXXXXX" required
                      />
                    </div>
                    <div className="form-group">
                      <label>ঠিকানা *</label>
                      <textarea
                        name="address" value={form.address} onChange={handleChange}
                        placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন"
                        rows={3} required
                      />
                    </div>

                    <div className="booking-summary">
                      <div className="summary-row">
                        <span>পশুর নাম</span>
                        <span>{animal.name}</span>
                      </div>
                      <div className="summary-row">
                        <span>মূল্য</span>
                        <span className="summary-price">৳{animal.price.toLocaleString("bn-BD")}</span>
                      </div>
                    </div>

                    <button type="submit" className="btn-primary booking-btn" disabled={submitting || !animal.available}>
                      {submitting ? "বুক হচ্ছে..." : animal.available ? "🎯 এখনই বুক করুন" : "বুকড হয়ে গেছে"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
