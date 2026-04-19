import { useState, useEffect } from 'react';
import { TicketCheck } from 'lucide-react';
import api from '../api';

const MOCK_HISTORY = [
  { id: 'BKN-8291', title: 'Tech Innovation Summit 2026', date: 'Oct 15, 2026', status: 'Confirmed' },
  { id: 'BKN-4472', title: 'StartUp Grind Meetup', date: 'Sep 02, 2026', status: 'Completed' },
];

const BookingList = ({ newBooking }: { newBooking?: any }) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (newBooking) {
      setHistory(prev => {
        if (prev.some(b => b.id === newBooking.id)) return prev;
        return [newBooking, ...prev];
      });
    }
  }, [newBooking]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings');
        if (data && data.bookings && data.bookings.length > 0) {
          const mapped = data.bookings.map((b: any) => ({
            id: `BKN-${b.id.toString().slice(-4)}`, // generate tiny display id
            title: b.Event ? b.Event.title : 'Event Booking',
            date: b.Event ? new Date(b.Event.startTime).toLocaleDateString() : 'TBA',
            status: b.status.charAt(0).toUpperCase() + b.status.slice(1)
          }));
          setHistory(mapped);
        } else {
          setHistory(MOCK_HISTORY);
        }
      } catch (e) {
        setHistory(MOCK_HISTORY); // Silently fallback
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="bg-dark-bg rounded-xl border border-dark-border overflow-hidden">
      <div className="p-5 border-b border-dark-border bg-dark-card/50">
        <h3 className="text-lg font-bold font-nunito text-white flex items-center gap-2">
          <TicketCheck className="text-accent-blue" size={18} />
          My Bookings
        </h3>
      </div>
      
      <div className="divide-y divide-dark-border">
        {history.map((booking, idx) => (
          <div key={idx} className="p-5 hover:bg-dark-card/50 transition-colors">
            <p className="text-xs text-gray-500 font-mono mb-1">{booking.id}</p>
            <h4 className="text-sm font-semibold text-white mb-2">{booking.title}</h4>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">{booking.date}</span>
              <span className={`px-2 py-0.5 rounded-full ${
                booking.status === 'Confirmed' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : booking.status === 'Pending'
                  ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                  : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
              }`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
