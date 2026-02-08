import { MapPin, ChevronLeft, Bed, Bath, Maximize } from 'lucide-react';
import DetailRow from './DetailRow';

export default function PropertyDetail({ property, onBack }) {
  return (
    <div className="detail-root">
      <header className="detail-header">
        <div className="container-narrow detail-header-inner">
          <button className="back-button" onClick={onBack}>
            <ChevronLeft size={18} />
            Back to listings
          </button>
        </div>
      </header>

      <main className="container-narrow detail-main">
        <div className="detail-hero">
          <img src={property.image} alt={property.title} />
        </div>

        <div className="detail-grid">
          <div>
            <div className="detail-price">${property.price.toLocaleString()}/month</div>

            <h1 className="detail-title">{property.title}</h1>

            <div className="detail-location">
              <MapPin size={20} />
              {property.location}
            </div>

            <p className="detail-description">{property.description}</p>

            <h2 className="amenities-title">Amenities</h2>

            <div className="amenities-list">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="amenity-pill">
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="details-card">
              <h3 className="details-title">Property Details</h3>

              <div className="details-list">
                <DetailRow icon={<Bed size={20} />} label="Bedrooms" value={property.bedrooms} />
                <DetailRow icon={<Bath size={20} />} label="Bathrooms" value={property.bathrooms} />
                <DetailRow
                  icon={<Maximize size={20} />}
                  label="Square Feet"
                  value={`${property.sqft} ft²`}
                />
              </div>

              <button className="schedule-button">Schedule Viewing</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
