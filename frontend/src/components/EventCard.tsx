interface EventCardProps {
  event: any;
  onBookClick: (event: any) => void;
}

function EventCard({ event, onBookClick }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-blue-500 transition">
      <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <span className="text-white text-6xl">{'</>'}</span>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs uppercase">
            {event.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{event.description}</p>
        
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.startTime)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">${event.basePrice}</span>
          <button
            onClick={() => onBookClick(event)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
