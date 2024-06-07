import React, { useState, useEffect } from "react";
import instance from "./Axios";
import Seat from "./Seat";
import BookingForm from "./BookingForm";

const SeatMap = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async (selectedDate) => {
    try {
        const response = await instance.get(`seats/?date=${selectedDate}`);
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleSeatClick = (seat) => {
    if (!seat.is_booked) {
      setSelectedSeat(seat);
    }
  };

  const handleBookingSubmit = (booking) => {
    setSeats((prevSeats) =>
        
      prevSeats.map((prevSeat) =>
        prevSeat.id === booking.seat.id ? { ...prevSeat, is_booked: true } : prevSeat
    
      )
    );
    setSelectedSeat(null);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Seat Map</h1>
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
