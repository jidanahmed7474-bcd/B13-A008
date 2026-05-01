import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("সফলভাবে লগআউট হয়েছেন!");
    navigate("/");
    setDropOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🐄</span>
          <span className="logo-text">
            Qurbani<span className="logo-accent">Hat</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>হোম</NavLink>
          <NavLink to="/animals" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>সকল পশু</NavLink>

          {!user ? (
            <div className="nav-auth">
              <Link to="/login" className="btn-outline" onClick={() => setMenuOpen(false)}>লগইন</Link>
              <Link to="/register" className="btn-primary" onClick={() => setMenuOpen(false)}>নিবন্ধন</Link>
            </div>
          ) : (
            <div className="avatar-wrap" ref={dropRef}>
              <button className="avatar-btn" onClick={() => setDropOpen(!dropOpen)}>
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a6b3a&color=fff`}
                  alt={user.name}
                  className="avatar-img"
                />
                <span className="avatar-name">{user.name?.split(" ")[0]}</span>
                <span className="drop-arrow">{dropOpen ? "▲" : "▼"}</span>
              </button>
              {dropOpen && (
                <div className="drop-menu animate__animated animate__fadeInDown animate__faster">
                  <Link to="/profile" className="drop-item" onClick={() => setDropOpen(false)}>👤 আমার প্রোফাইল</Link>
                  <button className="drop-item danger" onClick={handleLogout}>🚪 লগআউট</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open mid" : "bar mid"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </button>
      </div>
    </nav>
  );
}
