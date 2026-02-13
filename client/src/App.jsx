import { Routes, Route, Navigate } from 'react-router-dom'; // ✅ NO BrowserRouter
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Events from './pages/Events';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => (
  <>
    <Navbar />
    <Routes>
       <Route path="/" element={<Navigate to="/events" />} />
       <Route path="/events" element={<Events />} />
       <Route path="/events/:id" element={<EventDetails />} />  {/* ✅ NEW */}
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
       />
    </Routes>

  </>
);

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
