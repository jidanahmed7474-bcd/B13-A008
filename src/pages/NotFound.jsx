import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content animate__animated animate__fadeIn">
        <div className="nf-cow">🐄</div>
        <div className="nf-code">৪০৪</div>
        <h1 className="nf-title">পাতাটি পাওয়া যায়নি!</h1>
        <p className="nf-sub">
          আপনি যে পাতাটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে বা ঠিকানা ভুল।
          গরুটিও খুঁজে পাচ্ছে না! 😄
        </p>
        <div className="nf-btns">
          <Link to="/" className="btn-primary">🏠 হোমে ফিরুন</Link>
          <Link to="/animals" className="btn-outline">🐄 পশু দেখুন</Link>
        </div>
      </div>
    </div>
  );
}
