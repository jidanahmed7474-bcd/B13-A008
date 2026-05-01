import { useState, useEffect } from "react";
import AnimalCard from "../components/AnimalCard";
import { animals } from "../data/animals";
import "./AllAnimals.css";

export default function AllAnimals() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => { setList(animals); setLoading(false); }, 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = list.filter(a => filter === "All" || a.type === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    if (sort === "weight") return b.weight - a.weight;
    return a.id - b.id;
  });

  return (
    <div className="page-wrapper">
      <div className="animals-page">
        {/* Page Header */}
        <div className="page-hero">
          <div className="container">
            <div className="page-hero-badge">🐄 সকল পশু</div>
            <h1 className="page-hero-title">কুরবানির পশুর হাট</h1>
            <p className="page-hero-sub">সুস্থ, যাচাইকৃত এবং সেরা মানের পশু বেছে নিন</p>
          </div>
        </div>

        <div className="container">
          {/* Controls */}
          <div className="controls-bar">
            <div className="filter-tabs">
              {["All", "Cow", "Goat"].map(t => (
                <button
                  key={t}
                  className={`filter-tab ${filter === t ? "active" : ""}`}
                  onClick={() => setFilter(t)}
                >
                  {t === "All" ? "সব" : t === "Cow" ? "🐄 গরু" : "🐐 ছাগল"}
                </button>
              ))}
            </div>

            <div className="sort-wrap">
              <label>সাজান:</label>
              <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
                <option value="default">ডিফল্ট</option>
                <option value="low">মূল্য: কম → বেশি</option>
                <option value="high">মূল্য: বেশি → কম</option>
                <option value="weight">ওজন অনুযায়ী</option>
              </select>
            </div>
          </div>

          <p className="result-count">{sorted.length}টি পশু পাওয়া গেছে</p>

          {loading ? (
            <div className="spinner-wrap"><div className="spinner"></div></div>
          ) : sorted.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🐄</div>
              <h3>কোনো পশু পাওয়া যায়নি</h3>
              <p>অন্য ক্যাটেগরি চেষ্টা করুন।</p>
            </div>
          ) : (
            <div className="animals-grid-page">
              {sorted.map((a, i) => <AnimalCard key={a.id} animal={a} delay={i * 80} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
