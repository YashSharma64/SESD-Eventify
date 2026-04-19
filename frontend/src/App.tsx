import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventExplorer from './pages/EventExplorer';
import BookingDashboard from './pages/BookingDashboard';

function App() {
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
