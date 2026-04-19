import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold font-nunito tracking-wide">
          <Calendar className="text-accent-blue" />
          <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
            Eventify
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
            Dashboard
          </Link>
          <div className="flex items-center gap-2 bg-dark-card px-3 py-1.5 rounded-full border border-dark-border">
            <User size={16} className="text-gray-400" />
            <span className="text-xs text-gray-300">Attendee</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
