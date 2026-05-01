import { Link } from "react-router-dom";
import "./AnimalCard.css";

export default function AnimalCard({ animal, delay = 0 }) {
  return (
    <div
      className="animal-card animate__animated animate__fadeInUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-img-wrap">
        <img src={animal.image} alt={animal.name} className="card-img" loading="lazy" />
        <div className="card-badges">
          <span className={`badge ${animal.type === "Cow" ? "badge-green" : "badge-gold"}`}>
            {animal.type === "Cow" ? "🐄 গরু" : "🐐 ছাগল"}
          </span>
          {!animal.available && <span className="badge badge-red">বুকড</span>}
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-name">{animal.name}</h3>
        <p className="card-breed">{animal.breed} · {animal.location}</p>
        <div className="card-meta">
          <span>⚖️ {animal.weight} কেজি</span>
          <span>📅 {animal.age} বছর</span>
        </div>
        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">মূল্য</span>
            <span className="price-value">৳{animal.price.toLocaleString("bn-BD")}</span>
          </div>
          <Link to={`/animals/${animal.id}`} className="btn-primary card-btn">বিস্তারিত →</Link>
        </div>
      </div>
    </div>
  );
}
