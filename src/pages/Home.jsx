import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import { animals } from "../data/animals";
import "./Home.css";

const tips = [
  { icon: "🔍", title: "সুস্থতা পরীক্ষা", desc: "পশু কেনার আগে দাঁত, খুর ও চোখ ভালোভাবে পরীক্ষা করুন।" },
  { icon: "⚖️", title: "সঠিক ওজন", desc: "কুরবানির পশুর বয়স ও ওজন ইসলামের নির্দেশনা অনুযায়ী হতে হবে।" },
  { icon: "🏠", title: "রাখার ব্যবস্থা", desc: "পশু কেনার আগে থাকার ও খাওয়ার ব্যবস্থা নিশ্চিত করুন।" },
  { icon: "💉", title: "টিকা নিশ্চিত", desc: "ভ্যাকসিন দেওয়া ও সুস্থ পশু কুরবানির জন্য উত্তম।" },
];

const breeds = [
  { name: "শাহীওয়াল", origin: "পাকিস্তান", img: "https://i.postimg.cc/BbF42k85/adrian-infernus-v-MO93-N4nm-Q-unsplash.jpg" },
  { name: "ফ্রিজিয়ান", origin: "ইউরোপ", img: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=300&q=70" },
  { name: "ব্ল্যাক বেঙ্গল", origin: "বাংলাদেশ", img: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=300&q=70" },
  { name: "ব্রাহমান", origin: "আমেরিকা", img: "https://i.postimg.cc/FzT8dxpD/robert-schwarz-ftlk-Vi-NWWKo-unsplash.jpg" },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeatured(animals.slice(0, 4));
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge animate__animated animate__fadeInDown">
            ☪️ ঈদুল আযহা ২০২৬
          </div>
          <h1 className="hero-title animate__animated animate__fadeInUp">
            বিশ্বস্ত কুরবানির<br />
            <span className="hero-gold">পশুর হাট</span>
          </h1>
          <p className="hero-sub animate__animated animate__fadeInUp animate__delay-1s">
            সুস্থ, হৃষ্টপুষ্ট ও যাচাইকৃত পশু — সরাসরি আপনার দোরগোড়ায়।<br />
            অনলাইনে বুক করুন, নিশ্চিন্তে কুরবানি দিন।
          </p>
          <div className="hero-btns animate__animated animate__fadeInUp animate__delay-1s">
            <Link to="/animals" className="btn-gold">🐄 পশু দেখুন</Link>
            <Link to="/register" className="btn-outline hero-outline">আজই যোগ দিন</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">৫০০+</span><span className="stat-label">পশু</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="stat-num">২০০+</span><span className="stat-label">বিক্রেতা</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="stat-num">১০০%</span><span className="stat-label">বিশ্বস্ত</span></div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>নিচে স্ক্রোল করুন</span>
          <div className="scroll-dot"></div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">✨ বিশেষভাবে নির্বাচিত</p>
            <h2 className="section-title">ফিচার্ড পশু</h2>
            <div className="gold-line"></div>
            <p className="section-sub">সেরা মানের ও যাচাইকৃত পশু বিশেষভাবে আপনার জন্য।</p>
          </div>

          {loading ? (
            <div className="spinner-wrap"><div className="spinner"></div></div>
          ) : (
            <div className="animals-grid">
              {featured.map((a, i) => <AnimalCard key={a.id} animal={a} delay={i * 100} />)}
            </div>
          )}

          <div className="section-cta">
            <Link to="/animals" className="btn-primary">সকল পশু দেখুন →</Link>
          </div>
        </div>
      </section>

      {/* Qurbani Tips */}
      <section className="section tips-section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">📖 ইসলামিক নির্দেশনা</p>
            <h2 className="section-title">কুরবানির পরামর্শ</h2>
            <div className="gold-line"></div>
          </div>
          <div className="tips-grid">
            {tips.map((tip, i) => (
              <div key={i} className="tip-card animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Breeds */}
      <section className="section breeds-section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">🏆 সেরা জাত</p>
            <h2 className="section-title">টপ ব্রিড</h2>
            <div className="gold-line"></div>
          </div>
          <div className="breeds-grid">
            {breeds.map((b, i) => (
              <div key={i} className="breed-card">
                <div className="breed-img-wrap">
                  <img src={b.img} alt={b.name} />
                </div>
                <div className="breed-info">
                  <h4>{b.name}</h4>
                  <p>উৎপত্তি: {b.origin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra: Why Choose Us */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">💎 কেন আমরা</p>
            <h2 className="section-title">QurbaniHat কেন বেছে নেবেন?</h2>
            <div className="gold-line"></div>
          </div>
          <div className="why-grid">
            {[
              { icon: "🛡️", t: "১০০% যাচাইকৃত", d: "সকল পশু ভেটেরিনারি দ্বারা পরীক্ষিত।" },
              { icon: "🚚", t: "হোম ডেলিভারি", d: "আপনার দোরগোড়ায় পশু পৌঁছে দেওয়া হবে।" },
              { icon: "💳", t: "নিরাপদ পেমেন্ট", d: "বিকাশ, নগদ, ক্যাশ — সব পদ্ধতি গ্রহণযোগ্য।" },
              { icon: "📞", t: "২৪/৭ সাপোর্ট", d: "যেকোনো সমস্যায় আমরা সবসময় পাশে আছি।" },
              { icon: "🔄", t: "রিফান্ড পলিসি", d: "পশুতে সমস্যা হলে সম্পূর্ণ অর্থ ফেরত।" },
              { icon: "📱", t: "সহজ বুকিং", d: "মাত্র কয়েক মিনিটে অনলাইনে বুক করুন।" },
            ].map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <h4>{w.t}</h4>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2>আজই আপনার কুরবানির পশু বুক করুন!</h2>
            <p>সীমিত স্টক — দেরি না করে এখনই বুকিং দিন।</p>
          </div>
          <Link to="/animals" className="btn-gold">এখনই বুক করুন →</Link>
        </div>
      </section>
    </div>
  );
}
