interface Seat {
  id: string;
  status: 'available' | 'locked' | 'booked';
}

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: string[];
  onToggleSeat: (seatId: string) => void;
}

const SeatMap = ({ seats, selectedSeats, onToggleSeat }: SeatMapProps) => {
  return (
    <div className="bg-dark-bg p-6 rounded-xl border border-dark-border">
      <div className="mb-6 flex justify-center gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500"></div>
          <span>Locked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500"></div>
          <span>Booked</span>
        </div>
      </div>
      
      <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto rounded-full mb-8 opacity-50 relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 uppercase tracking-widest font-semibold">Stage</div>
      </div>

      <div className="grid grid-cols-10 gap-2 max-w-md mx-auto">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          
          let baseClasses = "w-full aspect-square rounded flex items-center justify-center text-[10px] font-bold transition-all cursor-not-allowed";
          if (seat.status === 'booked') {
            baseClasses += " bg-red-500/10 border border-red-500/30 text-red-500/50";
          } else if (seat.status === 'locked') {
            baseClasses += " bg-yellow-500/10 border border-yellow-500/30 text-yellow-500/50";
          } else {
            baseClasses = "w-full aspect-square rounded flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer hover:scale-110 " + 
              (isSelected 
                ? "bg-accent-blue text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-accent-blue" 
                : "bg-emerald-500/10 border border-emerald-500 text-emerald-500 hover:bg-emerald-500/20");
          }

          return (
            <button
              key={seat.id}
              disabled={seat.status !== 'available'}
              onClick={() => seat.status === 'available' && onToggleSeat(seat.id)}
              className={baseClasses}
            >
              {seat.id}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatMap;
