import { MapPin, Calendar, Clock, Ticket } from 'lucide-react';

interface BookingSummaryProps {
  event: any;
  seats: string[];
  ticketType: string;
  totalPrice: number;
}

const BookingSummary = ({ event, seats, ticketType, totalPrice }: BookingSummaryProps) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-accent-blue/10"></div>
      
      <div className="flex justify-between items-start mb-6 border-b border-dark-border pb-4 relative z-10">
        <div>
          <h2 className="text-2xl font-bold font-nunito text-white mb-2">{event.title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent-blue"/> {event.date}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent-purple"/> {event.venue}</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-semibold rounded-full uppercase tracking-wider">
          Pending
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 relative z-10">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Seats</p>
            <p className="font-semibold text-white">{seats.join(', ')}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Type</p>
            <p className="font-semibold text-white">{ticketType}</p>
          </div>
        </div>
        
        <div className="bg-dark-bg rounded-lg border border-dark-border p-4 flex flex-col justify-center items-center text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Total Amount</p>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
