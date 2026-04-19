import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import api from '../api';

const MOCK_EVENTS = [
  { id: '1', title: 'Tech Innovation Summit 2026', date: 'Oct 15, 2026', venue: 'Convention Center', price: 150, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: '2', title: 'Neon Nights Music Festival', date: 'Nov 02, 2026', venue: 'Downtown Arena', price: 85, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80' },
  { id: '3', title: 'Global Design Conference', date: 'Dec 10, 2026', venue: 'Arts District', price: 200, image: 'https://images.unsplash.com/photo-1475721025505-2311f93f61b0?w=800&q=80' },
  { id: '4', title: 'Indie Film Screening', date: 'Jan 05, 2027', venue: 'Cinema House', price: 25, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80' },
];

const EventExplorer = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        if (data && data.events && data.events.length > 0) {
          const mappedEvents = data.events.map((e: any) => ({
            id: e.id,
            title: e.title,
            date: new Date(e.startTime).toLocaleDateString() || 'TBA',
            venue: e.Venue ? e.Venue.name : 'TBA',
            price: e.basePrice,
            image: MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)].image
          }));
          setEvents(mappedEvents);
        } else {
          setEvents(MOCK_EVENTS);
        }
      } catch (error) {
        setEvents(MOCK_EVENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Live filter — matches title, venue, or date
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.date.toLowerCase().includes(q)
    );
  }, [searchQuery, events]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-nunito tracking-tight flex flex-col sm:inline-block">
          Discover & Book <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text sm:ml-2">Events</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Experience seamless event booking with real-time seat selection and secure checkouts.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-accent-blue transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, venues, or dates..."
            className="w-full pl-11 pr-10 py-3 bg-dark-card border border-dark-border rounded-xl focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue outline-none transition-all shadow-sm text-white placeholder-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Result count */}
        {searchQuery && !loading && (
          <p className="text-sm text-gray-500">
            {filteredEvents.length > 0
              ? `${filteredEvents.length} result${filteredEvents.length > 1 ? 's' : ''} for "${searchQuery}"`
              : `No events found for "${searchQuery}"`}
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">Loading events...</div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          <p className="text-4xl">🔍</p>
          <p className="text-gray-400 text-lg">No events match your search.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-accent-blue hover:text-accent-purple transition-colors text-sm"
          >
            Clear search
          </button>
        </div>
      )}

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
