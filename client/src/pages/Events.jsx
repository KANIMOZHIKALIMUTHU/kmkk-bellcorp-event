import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (location) params.append('location', location);

    fetch(`${API_URL}/api/events?${params}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Events fetch error:', err);
        setEvents([]);
        setLoading(false);
      });
  }, [search, category, location]);

  const updateSearch = useCallback((value) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) newParams.set('search', value);
      else newParams.delete('search');
      return newParams;
    });
  }, [setSearchParams]);

  const updateCategory = useCallback((value) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) newParams.set('category', value);
      else newParams.delete('category');
      return newParams;
    });
  }, [setSearchParams]);

  const updateLocation = useCallback((value) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) newParams.set('location', value);
      else newParams.delete('location');
      return newParams;
    });
  }, [setSearchParams]);

  const clearFilters = () => {
    setSearchParams({});
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.5rem' }}>
        🔄 Loading Events...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          🎉 Discover Amazing Events
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.2rem' }}>
          {events.length} events available near you
        </p>
      </div>

      {/* Search & Filters */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '16px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem', 
          alignItems: 'end'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              🔍 Search Events
            </label>
            <input
              type="text"
              placeholder="React, Music, Coimbatore..."
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              🏷️ Category
            </label>
            <select
              value={category}
              onChange={(e) => updateCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="">All Categories</option>
              <option value="Tech">Tech</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Music">Music</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
              <option value="Food">Food</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              📍 Location
            </label>
            <select
              value={location}
              onChange={(e) => updateLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="">All Locations</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
            <button
              onClick={clearFilters}
              style={{
                padding: '12px 24px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
            {user && (
              <a href="/dashboard" style={{
                padding: '12px 24px',
                background: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '500'
              }}>
                My Dashboard
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem', 
          color: '#6b7280',
          fontSize: '1.2rem'
        }}>
          <p>📭 No events found matching your criteria</p>
          <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
            Try different search terms or clear filters
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
          gap: '2rem' 
        }}>
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
