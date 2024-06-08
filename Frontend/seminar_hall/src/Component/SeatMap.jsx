import React, { useState, useEffect } from "react";
import instance from "./Axios";
import Seat from "./Seat";
import BookingForm from "./BookingForm";

const SeatMap = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // Added state for selected date

  useEffect(() => {
    fetchSeats(selectedDate); // Fetch seats based on selected date
  }, [selectedDate]);

  const fetchSeats = async (date) => {
    try {
      const response = await instance.get(`seats/?date=${date}`);
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

  const handleBookingSubmit = async (formData) => {
    try {
      const response = await instance.post("bookings/", formData);
      
      // Update UI and state only if booking is successful
      setSeats((prevSeats) =>
        prevSeats.map((prevSeat) =>
          prevSeat.id === formData.seat ? { ...prevSeat, is_booked: true } : prevSeat
        )
      );
      setSelectedSeat(null);
    } catch (error) {
      console.error("Error booking seat:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Seat Map</h1>
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
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
