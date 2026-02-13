import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EventCard = ({ event }) => {
  const [registering, setRegistering] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!user) {
      alert('Please login to register for events');
      navigate('/login');
      return;
    }

    setRegistering(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventId: event._id })
      });
      
      if (res.ok) {
        alert(`✅ Registered for "${event.name}"! Check your dashboard.`);
      } else {
        const data = await res.json();
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      alert('❌ Registration failed. Please try again.');
    }
    setRegistering(false);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '2.5rem',
      boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(59, 130, 246, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-12px)';
      e.currentTarget.style.boxShadow = '0 35px 70px rgba(0,0,0,0.18)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.12)';
    }}
    >
      {/* Category Badge */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px',
        background: `linear-gradient(135deg, ${getCategoryColor(event.category)}, ${getCategoryColor(event.category, true)})`,
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        {event.category}
      </div>

      {/* Event Content */}
      <h3 style={{ 
        fontSize: '1.75rem', 
        fontWeight: '800', 
        marginBottom: '1.5rem',
        color: '#1f2937',
        lineHeight: '1.3'
      }}>
        {event.name}
      </h3>

      <div style={{ 
        color: '#6b7280', 
        marginBottom: '1.5rem', 
        fontSize: '1rem',
        lineHeight: '1.6'
      }}>
        <div style={{ 
          fontWeight: '600', 
          color: '#374151', 
          fontSize: '1.1rem',
          marginBottom: '1rem'
        }}>
          {event.organizer}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ 
            width: '20px', 
            height: '20px', 
            background: '#f59e0b', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '0.75rem',
            color: 'white',
            fontWeight: 'bold'
          }}>📍</span>
          <span>{event.location}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            width: '20px', 
            height: '20px', 
            background: '#10b981', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '0.75rem',
            color: 'white',
            fontWeight: 'bold'
          }}>📅</span>
          <span style={{ fontWeight: '500' }}>
            {new Date(event.date).toLocaleDateString('en-IN', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      <p style={{ 
        color: '#4b5563', 
        lineHeight: '1.7', 
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        {event.description}
      </p>

      {/* PROFESSIONAL REGISTER BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        {/* Capacity Badge */}
        <div style={{ 
          padding: '10px 20px',
          background: event.capacity > 10 ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          borderRadius: '50px',
          fontWeight: '700',
          fontSize: '0.95rem',
          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
          minWidth: '140px',
          textAlign: 'center'
        }}>
          {event.capacity > 10 ? '🟢 Plenty Seats' : '🔴 Limited Seats'}
        </div>

        {/* STUNNING REGISTER BUTTON */}
        {user ? (
          <button
            onClick={handleRegister}
            disabled={registering}
            style={{
              flex: 1,
              padding: '16px 32px',
              background: registering 
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: '800',
              cursor: registering ? 'not-allowed' : 'pointer',
              boxShadow: registering 
                ? '0 4px 12px rgba(156, 163, 175, 0.4)' 
                : '0 10px 30px rgba(59, 130, 246, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => !registering && (e.target.style.transform = 'translateY(-2px) scale(1.02)')}
            onMouseLeave={(e) => !registering && (e.target.style.transform = 'translateY(0) scale(1)')}
          >
            {registering ? (
              <>
                <span style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.8s linear infinite',
                  marginRight: '10px'
                }} />
                Registering...
              </>
            ) : (
              'Register Now'
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            style={{
              flex: 1,
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(107, 114, 128, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-2px) scale(1.02)')}
            onMouseLeave={(e) => (e.target.style.transform = 'translateY(0) scale(1)')}
          >
            Login to Register
          </button>
        )}
      </div>
    </div>
  );
};

// Category color helper
const getCategoryColor = (category, darker = false) => {
  const colors = {
    Tech: '#3b82f6',
    Backend: '#10b981',
    Database: '#f59e0b',
    Music: '#ec4899',
    Business: '#8b5cf6',
    Sports: '#ef4444',
    Food: '#f97316',
    DevOps: '#06b6d4'
  };
  return colors[category] || '#6b7280';
};

export default EventCard;
