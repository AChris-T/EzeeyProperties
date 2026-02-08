import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { properties } from './components/data';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import './App.css';

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filterLocation, setFilterLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const locations = useMemo(() => {
    return ['all', ...new Set(properties.map(p => p.location))];
  }, []);

  const filteredProperties = useMemo(() => {
    let filtered = properties;

    if (filterLocation !== 'all') {
      filtered = filtered.filter(p => p.location === filterLocation);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'bedrooms':
        sorted.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      default:
        break;
    }

    return sorted;
  }, [filterLocation, sortBy, searchQuery]);

  if (selectedProperty) {
    return (
      <PropertyDetail
        property={selectedProperty}
        onBack={() => setSelectedProperty(null)}
      />
    );
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="container header-content">
          <div>
            <h1 className="brand-title">PropertyHub</h1>
            <p className="brand-subtitle">
              {filteredProperties.length} properties available
            </p>
          </div>

          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`filters-button ${showFilters ? 'active' : ''}`}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="container filters-panel-inner">
              <div className="filter-group">
                <label htmlFor="filter-location">Location</label>
                <select
                  id="filter-location"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="filters-select"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="filter-sort">Sort By</label>
                <select
                  id="filter-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filters-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="bedrooms">Most Bedrooms</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="container main-content">
        {filteredProperties.length === 0 ? (
          <div className="empty-state">
            <Search size={64} className="empty-icon" />
            <h2>No properties found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="property-grid">
            {filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => setSelectedProperty(property)}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
