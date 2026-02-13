import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const [today] = useState(new Date());

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/registrations`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setRegistrations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
      setLoading(false);
    };
    fetchRegistrations();
  }, []);

  const upcoming = registrations.filter(reg => new Date(reg.eventId.date) >= today);
  const past = registrations.filter(reg => new Date(reg.eventId.date) < today);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        Loading your events...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937' }}>
            Welcome back, {user?.name}!
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.2rem' }}>
            Your event registrations ({registrations.length})
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            to="/events" 
            style={{
              padding: '12px 24px',
              background: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '600'
            }}
          >
            Browse Events
          </Link>
          <button
            onClick={logout}
            style={{
              padding: '12px 24px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: '#059669',
          marginBottom: '2rem'
        }}>
          📅 Upcoming Events ({upcoming.length})
        </h2>
        {upcoming.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem', 
            background: 'white', 
            borderRadius: '16px', 
            border: '2px dashed #d1d5db'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
              No upcoming events.{' '}
              <Link to="/events" style={{ color: '#3b82f6' }}>
                Browse events now!
              </Link>
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {upcoming.map(reg => (
              <div key={reg._id} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                  {reg.eventId.name}
                </h3>
                <div style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  📍 {reg.eventId.location} • 📅 {new Date(reg.eventId.date).toLocaleDateString('en-IN')}
                </div>
                <Link 
                  to={`/events/${reg.eventId._id}`}
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: '#f59e0b',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      {past.length > 0 && (
        <div>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#6b7280',
            marginBottom: '2rem'
          }}>
            ⏰ Past Events ({past.length})
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {past.map(reg => (
              <div key={reg._id} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                  {reg.eventId.name}
                </h3>
                <div style={{ color: '#6b7280' }}>
                  📍 {reg.eventId.location} • 📅 {new Date(reg.eventId.date).toLocaleDateString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
