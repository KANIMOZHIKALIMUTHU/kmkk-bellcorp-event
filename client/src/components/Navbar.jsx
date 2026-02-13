import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <nav style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        {/* Logo */}
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          textDecoration: 'none' 
        }}>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎫 Bellcorp
          </div>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link 
            to="/events" 
            style={{ 
              padding: '10px 20px',
              color: isActive('/events') ? '#3b82f6' : '#374151',
              textDecoration: 'none',
              fontWeight: isActive('/events') ? '700' : '500',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            Events
          </Link>

          {user && (
            <Link 
              to="/dashboard" 
              style={{ 
                padding: '10px 20px',
                color: isActive('/dashboard') ? '#3b82f6' : '#374151',
                textDecoration: 'none',
                fontWeight: isActive('/dashboard') ? '700' : '500',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
            >
              Dashboard
            </Link>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {loading ? (
              <div style={{ 
                width: '24px', 
                height: '24px', 
                border: '2px solid #e5e7eb', 
                borderTop: '2px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            ) : user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>
                  Hi, {user.name}!
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '8px 16px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  style={{
                    padding: '10px 20px',
                    background: '#3b82f6',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <span style={{ width: '24px', height: '2px', background: '#374151' }} />
          <span style={{ width: '24px', height: '2px', background: '#374151' }} />
          <span style={{ width: '24px', height: '2px', background: '#374151' }} />
        </button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          nav > div > div { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
