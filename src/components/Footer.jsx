import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">🐄 Qurbani<span>Hat</span></div>
            <p>বাংলাদেশের সেরা অনলাইন কুরবানির পশুর বাজার। বিশ্বস্ত বিক্রেতা, সুস্থ পশু, নিরাপদ লেনদেন।</p>
            <div className="social-links">
              <a href="#" className="social-btn">📘 Facebook</a>
              <a href="#" className="social-btn">📸 Instagram</a>
              <a href="#" className="social-btn">▶️ YouTube</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>দ্রুত লিঙ্ক</h4>
            <ul>
              <li><Link to="/">হোম</Link></li>
              <li><Link to="/animals">সকল পশু</Link></li>
              <li><Link to="/login">লগইন</Link></li>
              <li><Link to="/register">নিবন্ধন</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>পশুর ধরন</h4>
            <ul>
              <li><Link to="/animals">গরু</Link></li>
              <li><Link to="/animals">ছাগল</Link></li>
              <li><Link to="/animals">ভেড়া</Link></li>
              <li><Link to="/animals">উট</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>যোগাযোগ</h4>
            <ul className="contact-list">
              <li>📍 ঢাকা, বাংলাদেশ</li>
              <li>📞 +880 1700-000000</li>
              <li>✉️ info@qurbanihat.com</li>
              <li>🕐 সকাল ৮টা - রাত ১০টা</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© ২০২৬ QurbaniHat। সকল স্বত্ব সংরক্ষিত।</p>
          <p>☪️ ঈদুল আযহার শুভেচ্ছায় নির্মিত</p>
        </div>
      </div>
    </footer>
  );
}
