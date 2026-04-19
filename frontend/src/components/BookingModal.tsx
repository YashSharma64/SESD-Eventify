import { useState } from 'react';

interface BookingModalProps {
  event: any;
  onClose: () => void;
}

function BookingModal({ event, onClose }: BookingModalProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [ticketType, setTicketType] = useState('general');

  const seats = [
    { id: 'A1', status: 'available' },
    { id: 'A2', status: 'available' },
    { id: 'A3', status: 'booked' },
    { id: 'A4', status: 'available' },
    { id: 'A5', status: 'locked' },
    { id: 'B1', status: 'available' },
    { id: 'B2', status: 'booked' },
    { id: 'B3', status: 'available' },
    { id: 'B4', status: 'available' },
    { id: 'B5', status: 'available' },
  ];

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600 cursor-pointer';
      case 'locked':
        return 'bg-yellow-500 cursor-not-allowed';
      case 'booked':
        return 'bg-red-500 cursor-not-allowed';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSeatClick = (seatId: string, status: string) => {
    if (status !== 'available') return;

    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const calculatePrice = () => {
    const basePrice = event.basePrice;
    let multiplier = 1;
    
    if (ticketType === 'vip') multiplier = 1.5;
    else if (ticketType === 'early_bird') multiplier = 0.8;
    
    return (basePrice * multiplier * selectedSeats.length).toFixed(2);
  };

  const handleProceed = () => {
    alert(`Booking ${selectedSeats.length} seats for ${event.title}\nTotal: $${calculatePrice()}\n\nThis would call: POST /api/bookings`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#2a2a2a]">
        <div className="p-6 border-b border-[#2a2a2a] flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{event.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-400 mb-2">{event.description}</p>
            <p className="text-blue-400">Date: {new Date(event.startTime).toLocaleString()}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Select Seats</h3>
            <p className="text-sm text-gray-400 mb-3">
              Seat states handled using <span className="text-blue-400 font-semibold">State Pattern</span> in backend
            </p>
            <div className="flex gap-4 mb-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-400">Locked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-400">Booked</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {seats.map(seat => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat.id, seat.status)}
                  disabled={seat.status !== 'available'}
                  className={`${getSeatColor(seat.status)} p-3 rounded text-white text-sm font-semibold transition ${
                    selectedSeats.includes(seat.id) ? 'ring-2 ring-blue-400' : ''
                  }`}
                >
                  {seat.id}
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Selected: {selectedSeats.length} seats
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Ticket Type</h3>
            <p className="text-sm text-gray-400 mb-3">
              Ticket creation uses <span className="text-blue-400 font-semibold">Factory Pattern</span>
            </p>
            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
            >
              <option value="general">General - ${event.basePrice}</option>
              <option value="vip">VIP - ${(event.basePrice * 1.5).toFixed(2)}</option>
              <option value="early_bird">Early Bird - ${(event.basePrice * 0.8).toFixed(2)}</option>
            </select>
          </div>

          <div className="bg-[#0f0f0f] rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-3xl font-bold text-white">${calculatePrice()}</span>
            </div>
          </div>

          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
