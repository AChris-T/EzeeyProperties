import { MapPin, Bed, Bath, Maximize } from 'lucide-react';

export default function PropertyCard({ property, onClick, index }) {
  return (
    <div
      className="property-card fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="card-image-wrapper">
        <img className="card-image" src={property.image} alt={property.title} />
        <div className="price-badge">${property.price.toLocaleString()}/mo</div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{property.title}</h3>

        <div className="card-location">
          <MapPin size={16} />
          {property.location}
        </div>

        <div className="card-features">
          <div className="feature-item">
            <Bed size={16} />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="feature-item">
            <Bath size={16} />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="feature-item">
            <Maximize size={16} />
            <span>{property.sqft} ft²</span>
          </div>
        </div>
      </div>
    </div>
  );
}
