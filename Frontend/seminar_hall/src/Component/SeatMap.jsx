import React, { useState, useEffect } from 'react';
import instance from './Axios';
import Seat from './Seat';
import BookingForm from './BookingForm';

const SeatMap = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await instance.get('seats/');
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const handleSeatClick = (seat) => {
    if (!seat.is_booked) {
      setSelectedSeat(seat);
    }
  };

  const handleBookingSubmit = (booking) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => (seat.id === booking.seat.id ? { ...seat, is_booked: true } : seat))
    );
    setSelectedSeat(null);
  };

  return (
    <div className="seat-map p-4">
      <h1 className="text-2xl font-bold mb-4">Seat Map</h1>
      <div className="grid grid-cols-4 gap-4">
        {seats.map((seat) => (
          <Seat key={seat.id} seat={seat} onClick={() => handleSeatClick(seat)} />
        ))}
      </div>
      {selectedSeat && <BookingForm seat={selectedSeat} onSubmit={handleBookingSubmit} />}
    </div>
  );
};

export default SeatMap;
