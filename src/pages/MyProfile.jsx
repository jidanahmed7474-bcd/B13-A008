import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Profile.css";

export default function MyProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div>
          <h2 style={{ marginBottom: 12 }}>লগইন প্রয়োজন</h2>
          <Link to="/login" className="btn-primary">লগইন করুন</Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success("সফলভাবে লগআউট হয়েছেন!");
    navigate("/");
  };

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="page-wrapper">
      <div className="profile-page">
        {/* Header Banner */}
        <div className="profile-banner">
          <div className="banner-pattern"></div>
          <div className="container profile-banner-inner">
            <div className="profile-avatar-wrap">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.name} className="profile-avatar" />
              ) : (
                <div className="profile-avatar-placeholder">{initial}</div>
              )}
              <div className="profile-online"></div>
            </div>
            <div className="profile-banner-info">
              <h1 className="animate__animated animate__fadeInUp">{user.name}</h1>
              <p className="animate__animated animate__fadeInUp">{user.email}</p>
              <span className="badge badge-green animate__animated animate__fadeInUp">✅ যাচাইকৃত সদস্য</span>
            </div>
          </div>
        </div>

        <div className="container profile-body">
          <div className="profile-grid">
            {/* Info Card */}
            <div className="profile-card animate__animated animate__fadeInLeft">
              <h2 className="profile-card-title">👤 প্রোফাইল তথ্য</h2>
              <div className="profile-info-list">
                <div className="profile-info-item">
                  <span className="info-label">📛 নাম</span>
                  <span className="info-val">{user.name}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">✉️ ইমেইল</span>
                  <span className="info-val">{user.email}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">🆔 ইউজার আইডি</span>
                  <span className="info-val uid">{user.uid}</span>
                </div>
                <div className="profile-info-item">
                  <span className="info-label">📸 ফটো</span>
                  <span className="info-val">{user.photoURL ? "সেট করা আছে" : "সেট করা নেই"}</span>
                </div>
              </div>

              <div className="profile-actions">
                <Link to="/update-profile" className="btn-primary">✏️ তথ্য আপডেট করুন</Link>
                <button className="btn-outline danger-btn" onClick={handleLogout}>🚪 লগআউট</button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="profile-right">
              <div className="profile-card animate__animated animate__fadeInRight">
                <h2 className="profile-card-title">📊 অ্যাকাউন্ট সারাংশ</h2>
                <div className="profile-stats">
                  <div className="pstat">
                    <span className="pstat-icon">🐄</span>
                    <span className="pstat-num">০</span>
                    <span className="pstat-label">বুকিং করা পশু</span>
                  </div>
                  <div className="pstat">
                    <span className="pstat-icon">❤️</span>
                    <span className="pstat-num">০</span>
                    <span className="pstat-label">পছন্দের তালিকা</span>
                  </div>
                  <div className="pstat">
                    <span className="pstat-icon">📦</span>
                    <span className="pstat-num">০</span>
                    <span className="pstat-label">সম্পন্ন অর্ডার</span>
                  </div>
                </div>
              </div>

              <div className="profile-card animate__animated animate__fadeInRight tip-profile-card">
                <h2 className="profile-card-title">🌙 কুরবানির প্রস্তুতি</h2>
                <p>এই ঈদে আপনার কুরবানির পশু বুক করুন আগে ভাগে।</p>
                <Link to="/animals" className="btn-gold" style={{ marginTop: 16, display: "inline-flex" }}>
                  🐄 পশু দেখুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
