import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
import BookingModal from './components/BookingModal';
import { eventService } from './services/api';

function App() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getAll();
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(getDummyEvents());
    }
  };

  const getDummyEvents = () => {
    return [
      {
        id: '1',
        title: 'Rock Concert 2024',
        description: 'An amazing rock music experience',
        category: 'concert',
        startTime: '2024-12-15T19:00:00',
        basePrice: 50,
        venueId: 'venue-1',
      },
      {
        id: '2',
        title: 'Tech Conference',
        description: 'Latest technology trends and innovations',
        category: 'conference',
        startTime: '2024-12-20T09:00:00',
        basePrice: 100,
        venueId: 'venue-2',
      },
      {
        id: '3',
        title: 'Football Championship',
        description: 'Final match of the season',
        category: 'sports',
        startTime: '2024-12-25T15:00:00',
        basePrice: 75,
        venueId: 'venue-3',
      },
      {
        id: '4',
        title: 'Theater Night',
        description: 'Classic drama performance',
        category: 'theater',
        startTime: '2024-12-30T18:00:00',
        basePrice: 60,
        venueId: 'venue-4',
      },
    ];
  };

  const handleBookClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2">Explore Events</h1>
        <p className="text-gray-400 mb-8">Discover and book amazing events</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onBookClick={handleBookClick}
            />
          ))}
        </div>
      </main>

      {isModalOpen && selectedEvent && (
        <BookingModal 
          event={selectedEvent} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
