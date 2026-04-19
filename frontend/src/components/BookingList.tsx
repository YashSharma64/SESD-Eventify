import { TicketCheck } from 'lucide-react';

const MOCK_HISTORY = [
  { id: 'BKN-8291', title: 'Tech Innovation Summit 2026', date: 'Oct 15, 2026', status: 'Confirmed' },
  { id: 'BKN-4472', title: 'StartUp Grind Meetup', date: 'Sep 02, 2026', status: 'Completed' },
];

const BookingList = () => {
  return (
    <div className="bg-dark-bg rounded-xl border border-dark-border overflow-hidden">
      <div className="p-5 border-b border-dark-border bg-dark-card/50">
        <h3 className="text-lg font-bold font-nunito text-white flex items-center gap-2">
          <TicketCheck className="text-accent-blue" size={18} />
          My Bookings
        </h3>
      </div>
      
      <div className="divide-y divide-dark-border">
        {MOCK_HISTORY.map((booking) => (
          <div key={booking.id} className="p-5 hover:bg-dark-card/50 transition-colors">
            <p className="text-xs text-gray-500 font-mono mb-1">{booking.id}</p>
            <h4 className="text-sm font-semibold text-white mb-2">{booking.title}</h4>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">{booking.date}</span>
              <span className={`px-2 py-0.5 rounded-full ${
                booking.status === 'Confirmed' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
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
