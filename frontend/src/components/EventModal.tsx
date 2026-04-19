import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Calendar, CreditCard } from 'lucide-react';
import SeatMap from './SeatMap';
import api from '../api';

interface EventModalProps {
  event: any;
  onClose: () => void;
}

const generateMockSeats = () => {
  const seats = [];
  for (let i = 0; i < 50; i++) {
    const id = `${String.fromCharCode(65 + Math.floor(i / 10))}${(i % 10) + 1}`;
    const rand = Math.random();
    const status = rand > 0.8 ? 'booked' : rand > 0.7 ? 'locked' : 'available';
    seats.push({ id, status });
  }
  return seats;
};

const EventModal = ({ event, onClose }: EventModalProps) => {
  const [seats, setSeats] = useState<any[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [ticketType, setTicketType] = useState('General');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Fetch real venue seats
    const fetchSeats = async () => {
      try {
        // We assume event.venueId exists from backend mapping, or we just try 1
        const venueId = event.venueId || 1; 
        const { data } = await api.get(`/events/venues/${venueId}/seats`);
        if (data && data.seats && data.seats.length > 0) {
          const mappedSeats = data.seats.map((s: any) => ({
            id: s.id,
            seatNumber: s.seatNumber,
            status: s.status === 'available' ? 'available' : s.status === 'locked' ? 'locked' : 'booked'
          }));
          setSeats(mappedSeats);
        } else {
          setSeats(generateMockSeats());
        }
      } catch (err) {
        setSeats(generateMockSeats());
      }
    };
    
    fetchSeats();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [event]);

  const handleToggleSeat = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const ticketTypes = [
    { name: 'Early Bird', multiplier: 0.8 },
    { name: 'General', multiplier: 1 },
    { name: 'VIP', multiplier: 1.5 },
  ];

  const currentMultiplier = ticketTypes.find(t => t.name === ticketType)?.multiplier || 1;
  const totalPrice = selectedSeats.length * event.price * currentMultiplier;

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    
    navigate('/dashboard', { 
      state: { 
        event, 
        selectedSeats, 
        ticketType, 
        totalPrice 
      } 
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-dark-card w-full max-w-4xl rounded-2xl shadow-2xl border border-dark-border overflow-hidden flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-dark-bg/50 rounded-full hover:bg-dark-bg transition-colors z-10 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-y-auto">
          {/* Details Sidebar */}
          <div className="p-6 md:p-8 md:border-r border-dark-border flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold font-nunito mb-4 text-white">
                {event.title}
              </h2>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-3">
                  <Calendar className="text-accent-blue" size={18} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-accent-purple" size={18} />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-1">
              <h3 className="text-lg font-semibold text-white border-b border-dark-border pb-2">Ticket Type</h3>
              <div className="grid grid-cols-3 gap-3">
                {ticketTypes.map(type => (
                  <button
                    key={type.name}
                    onClick={() => setTicketType(type.name)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                      ticketType === type.name 
                        ? 'bg-accent-blue/10 border-accent-blue text-accent-blue' 
                        : 'bg-dark-bg border-dark-border text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 pt-2">
                Base price: ${event.price} &times; {currentMultiplier} ({ticketType})
              </p>
            </div>
            
            <div className="mt-auto bg-dark-bg p-5 rounded-xl border border-dark-border space-y-4">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-400">Selected Seats:</span>
                 <span className="font-semibold">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
               </div>
               <div className="flex justify-between items-center text-lg">
                 <span className="text-gray-400">Total Price:</span>
                 <span className="font-bold text-white">${totalPrice.toFixed(2)}</span>
               </div>
               
               <button 
                 onClick={handleProceed}
                 disabled={selectedSeats.length === 0}
                 className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                   selectedSeats.length > 0 
                     ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-blue/20 hover:scale-[1.02]' 
                     : 'bg-dark-border text-gray-500 cursor-not-allowed'
                 }`}
               >
                 <CreditCard size={18} />
                 Proceed to Booking
               </button>
            </div>
          </div>

          {/* Seat Map Area */}
          <div className="p-6 md:p-8 bg-black/20 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-6 font-nunito flex items-center gap-2">
              Select Your Seats
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <SeatMap 
                seats={seats}
                selectedSeats={selectedSeats}
                onToggleSeat={handleToggleSeat}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
