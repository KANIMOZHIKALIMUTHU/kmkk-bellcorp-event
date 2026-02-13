import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch single event by ID (mock data for now)
    const allEvents = [
      { 
      _id: '1', 
      name: 'React Masterclass 2026', 
      organizer: 'Bellcorp Studio', 
      location: 'Coders Hub, Coimbatore', 
      date: '2026-03-15T10:00:00Z',
      description: 'Advanced React Hooks, Context API, and performance optimization workshop. Live coding with real-world projects. Perfect for intermediate React developers.',
      capacity: 35, 
      category: 'Tech' 
    },
    { 
      _id: '2', 
      name: 'Node.js Production Ready', 
      organizer: 'Bellcorp Studio', 
      location: 'RS Puram, Coimbatore', 
      date: '2026-04-10T09:00:00Z',
      description: 'Scaling Node.js applications for production. Clustering, PM2, load balancing, and microservices architecture with hands-on demos.',
      capacity: 50, 
      category: 'Backend' 
    },
    { 
      _id: '3', 
      name: 'MongoDB Atlas Masterclass', 
      organizer: 'Bellcorp Tech', 
      location: 'Gandhipuram, Coimbatore', 
      date: '2026-02-28T14:00:00Z',
      description: 'Schema design patterns, aggregation framework, and Atlas deployment strategies. Real-world case studies from production apps.',
      capacity: 25, 
      category: 'Database' 
    },
    { 
      _id: '4', 
      name: 'Carnatic Music Fusion Night', 
      organizer: 'Coimbatore Arts Council', 
      location: 'PSG Tech Auditorium', 
      date: '2026-03-22T19:00:00Z',
      description: 'Live Carnatic fusion concert featuring top artists from South India. Traditional meets modern in an unforgettable musical evening.',
      capacity: 200, 
      category: 'Music' 
    },
    { 
      _id: '5', 
      name: 'Startup Pitch Fest 2026', 
      organizer: 'TiE Coimbatore', 
      location: 'KG Choksi Hall', 
      date: '2026-03-08T15:00:00Z',
      description: '50+ startups competing for investment. Live pitches, investor Q&A, and networking with VCs and industry leaders.',
      capacity: 150, 
      category: 'Business' 
    },
    { 
      _id: '6', 
      name: 'Coimbatore Marathon 2026', 
      organizer: 'Coimbatore Runners', 
      location: 'Race Course', 
      date: '2026-03-01T05:30:00Z',
      description: '21K Half Marathon + 10K Fun Run. Professional timing chips, medals, certificates, and post-race celebration.',
      capacity: 800, 
      category: 'Sports' 
    },
    { 
      _id: '7', 
      name: 'Full Stack MERN Bootcamp', 
      organizer: 'Bellcorp Academy', 
      location: 'Online + Offline', 
      date: '2026-03-20T09:00:00Z',
      description: '5-day intensive MERN stack training. From React frontend to MongoDB backend with deployment to Vercel/Render.',
      capacity: 20, 
      category: 'Training' 
    },
    { 
      _id: '8', 
      name: 'Chettinad Food Festival', 
      organizer: 'Coimbatore Foodies', 
      location: 'UGS Race Course', 
      date: '2026-03-12T17:00:00Z',
      description: 'Authentic Chettinad cuisine from 20+ master chefs. Live cooking demos, food stalls, and cooking workshops.',
      capacity: 300, 
      category: 'Food' 
    },
    { 
      _id: '9', 
      name: 'DevOps Automation Summit', 
      organizer: 'Bellcorp DevOps', 
      location: 'Chennai Trade Centre', 
      date: '2026-04-25T10:00:00Z',
      description: 'CI/CD pipelines, Kubernetes orchestration, and Infrastructure as Code. Hands-on workshops with GitHub Actions.',
      capacity: 120, 
      category: 'DevOps' 
    },
    { 
      _id: '10', 
      name: 'Python Data Science Bootcamp', 
      organizer: 'DataCamp India', 
      location: 'Taramani, Chennai', 
      date: '2026-03-10T09:30:00Z',
      description: 'Pandas, NumPy, Scikit-learn, and ML deployment. Real-world data science projects with end-to-end pipelines.',
      capacity: 40, 
      category: 'Data Science' 
    },
    { 
      _id: '11', 
      name: 'Kollywood Beats Live Concert', 
      organizer: 'EventZone', 
      location: 'CODISSIA Complex', 
      date: '2026-04-05T20:00:00Z',
      description: 'Top Tamil music artists performing live hits. Special guest appearances and fan meet-and-greet.',
      capacity: 500, 
      category: 'Music' 
    },
    { 
      _id: '12', 
      name: 'Digital Marketing Summit', 
      organizer: 'Digital India', 
      location: 'Le Meridien', 
      date: '2026-04-20T09:00:00Z',
      description: 'SEO, AI-driven marketing, social media strategies, and analytics. Live case studies from top brands.',
      capacity: 100, 
      category: 'Marketing' 
    },
    { 
      _id: '13', 
      name: 'Yoga Wellness Retreat', 
      organizer: 'Art of Living', 
      location: 'ISKCON Temple', 
      date: '2026-02-25T06:00:00Z',
      description: '3-day meditation and yoga retreat with expert instructors. Daily sessions + healthy meals included.',
      capacity: 40, 
      category: 'Fitness' 
    },
    { 
      _id: '14', 
      name: 'AWS Cloud Practitioner', 
      organizer: 'Cloud Academy', 
      location: 'Ram Nagar', 
      date: '2026-04-12T10:00:00Z',
      description: 'AWS certification preparation course. Hands-on labs + practice exams + official certification voucher.',
      capacity: 30, 
      category: 'Cloud' 
    },
    { 
      _id: '15', 
      name: 'Kids Coding Adventure Camp', 
      organizer: 'CodeKids', 
      location: 'Saibaba Colony', 
      date: '2026-04-01T09:00:00Z',
      description: 'Scratch programming + robotics for ages 8-14. Games, projects, and certificates for all participants.',
      capacity: 25, 
      category: 'Kids' 
    },
    { 
      _id: '16', 
      name: 'Street Photography Workshop', 
      organizer: 'Photographers Club', 
      location: 'RS Puram Streets', 
      date: '2026-02-22T07:00:00Z',
      description: 'Urban street photography field workshop. Pro tips + portfolio review + group photo walk.',
      capacity: 12, 
      category: 'Photography' 
    },
    { 
      _id: '17', 
      name: 'Family Fun Fair 2026', 
      organizer: 'Parents Association', 
      location: 'VOC Park', 
      date: '2026-03-29T10:00:00Z',
      description: 'Games, rides, magic shows, food stalls, and family entertainment for all ages.',
      capacity: 1000, 
      category: 'Family' 
    },
    { 
      _id: '18', 
      name: 'South Indian Dessert Workshop', 
      organizer: 'Sweet Tooth Academy', 
      location: 'RS Puram', 
      date: '2026-02-18T16:00:00Z',
      description: 'Learn to make Mysore Pak, Payasam, and traditional sweets with master chefs. Take home recipes + samples.',
      capacity: 15, 
      category: 'Culinary' 
    },
    { 
      _id: '19', 
      name: 'New Year Tech Meetup 2026', 
      organizer: 'Bellcorp', 
      location: 'Coimbatore', 
      date: '2026-01-10T18:30:00Z',
      description: 'Past networking event for developers. Tech talks + demos + casual networking. (Completed)',
      capacity: 60, 
      category: 'Networking' 
    },
    { 
      _id: '20', 
      name: 'Tech Networking Night', 
      organizer: 'Bellcorp Studio', 
      location: 'Gandhipuram', 
      date: '2026-03-05T19:00:00Z',
      description: 'Monthly developer mixer. Casual networking + lightning talks + free food + drinks.',
      capacity: 80, 
      category: 'Networking' 
    }
    ];
    
    const foundEvent = allEvents.find(e => e._id === id) || allEvents[0];
    setEvent(foundEvent);
    setLoading(false);
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setRegistering(true);
    // Registration logic here
    setTimeout(() => {
      alert(`✅ Registered for "${event.name}"!`);
      setRegistering(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.5rem' }}>
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Event not found</h2>
        <Link to="/events" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Back Button + Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <Link 
          to="/events" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '600',
            padding: '12px 20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            transition: 'all 0.2s'
          }}
        >
          ← Back to Events
        </Link>
        <div style={{
          background: `linear-gradient(135deg, ${getCategoryColor(event.category)}, ${getCategoryColor(event.category, true)})`,
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '700'
        }}>
          {event.category}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', alignItems: 'start' }}>
        {/* Event Details */}
        <div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            color: '#1f2937',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            {event.name}
          </h1>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            alignItems: 'center',
            marginBottom: '2.5rem',
            fontSize: '1.1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              {event.organizer}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📍</span>
              {event.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📅</span>
              {new Date(event.date).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div style={{ 
            background: 'white', 
            padding: '2.5rem', 
            borderRadius: '24px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            marginBottom: '2rem',
            lineHeight: '1.8'
          }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700', 
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              About This Event
            </h2>
            <p style={{ 
              color: '#4b5563', 
              fontSize: '1.1rem',
              lineHeight: '1.8'
            }}>
              {event.description}
            </p>
          </div>
        </div>

        {/* Sidebar - Register + Capacity */}
        <div style={{ 
          position: 'sticky', 
          top: '2rem', 
          height: 'fit-content' 
        }}>
          <div style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <div style={{
              padding: '20px',
              background: event.capacity > 10 ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              borderRadius: '16px',
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: '1.2rem',
              fontWeight: '800'
            }}>
              {event.capacity > 10 ? '🟢 Plenty Seats Available' : '🔴 Limited Seats Left'}
            </div>

            {user ? (
              <button
                onClick={handleRegister}
                disabled={registering}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: registering 
                    ? '#9ca3af' 
                    : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  cursor: registering ? 'not-allowed' : 'pointer',
                  boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {registering ? 'Registering...' : '🎫 Register Now - FREE'}
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 15px 35px rgba(107, 114, 128, 0.4)'
                }}
              >
                🔐 Login to Register
              </button>
            )}

            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: '#f8fafc', 
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <h4 style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                Event Capacity
              </h4>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#3b82f6' }}>
                {event.capacity}
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Seats Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Category color helper (same as EventCard)
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

export default EventDetails;
