import { useState } from 'react';
import { Search } from 'lucide-react';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

const MOCK_EVENTS = [
  { id: 1, title: 'Tech Innovation Summit 2026', date: 'Oct 15, 2026', venue: 'Convention Center', price: 150, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: 2, title: 'Neon Nights Music Festival', date: 'Nov 02, 2026', venue: 'Downtown Arena', price: 85, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80' },
  { id: 3, title: 'Global Design Conference', date: 'Dec 10, 2026', venue: 'Arts District', price: 200, image: 'https://images.unsplash.com/photo-1475721025505-2311f93f61b0?w=800&q=80' },
  { id: 4, title: 'Indie Film Screening', date: 'Jan 05, 2027', venue: 'Cinema House', price: 25, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80' },
];

const EventExplorer = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-nunito tracking-tight flex flex-col sm:inline-block">
          Discover & Book <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent sm:ml-2">Events</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Experience seamless event booking with real-time seat selection and secure checkouts.
        </p>
        
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-accent-blue transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search events, venues, or dates..."
            className="w-full pl-11 pr-4 py-3 bg-dark-card border border-dark-border rounded-xl focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_EVENTS.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onClick={() => setSelectedEvent(event)} 
          />
        ))}
      </div>

      {/* Render Modal if an event is selected */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default EventExplorer;
