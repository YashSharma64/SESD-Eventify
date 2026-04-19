import { Calendar, MapPin, Ticket } from 'lucide-react';

interface EventProps {
  event: {
    id: number;
    title: string;
    date: string;
    venue: string;
    price: number;
    image: string;
  };
  onClick: () => void;
}

const EventCard = ({ event, onClick }: EventProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-dark-card rounded-xl overflow-hidden border border-dark-border shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-accent-blue/10 hover:border-dark-border/80 cursor-pointer group flex flex-col"
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10" />
        <img 
          src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between relative z-20 -mt-8">
        <div>
          <h3 className="text-lg font-bold font-nunito mb-2 text-white">{event.title}</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-accent-blue" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-accent-purple" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1 font-semibold text-white">
            <Ticket size={16} />
            <span>${event.price}</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium border border-white/10 group-hover:bg-gradient-to-r group-hover:from-accent-blue group-hover:to-accent-purple group-hover:border-transparent cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
