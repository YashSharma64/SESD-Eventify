import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import EventExplorer from './pages/EventExplorer';
import BookingDashboard from './pages/BookingDashboard';
import api from './api';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Check if system has a test account, or create one, to keep the UI at 2 pages.
          try {
            await api.post('/auth/register', {
              email: 'test@eventify.com',
              password: 'password123',
              firstName: 'Test',
              lastName: 'User',
              role: 'attendee'
            });
          } catch (e) {
            // Already exists, just proceed to login
          }
          
          const { data } = await api.post('/auth/login', {
            email: 'test@eventify.com',
            password: 'password123'
          });
          
          localStorage.setItem('token', data.token);
        }
      } catch (error) {
        console.error('Failed to auto-login. Ensure the Backend is running.', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  if (isInitializing) {
    return <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center font-nunito animate-pulse">Initializing Connectivity...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-white font-inter">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<EventExplorer />} />
            <Route path="/dashboard" element={<BookingDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
