import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "./Axios";
import Seat from "./Seat";
import BookingForm from "./BookingForm";

const SeatMap = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      fetchSeats(selectedDate);
    }
  }, [selectedDate]);

  const fetchSeats = async (date) => {
    try {
      const response = await instance.get(`seats-listing-by-date/?date=${date}`);
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleSeatClick = (seat) => {
    if (!seat.is_booked_on_date) {
      setSelectedSeat(seat);
    }
  };

  const handleBookingSubmit = async (formData) => {
    try {
      const response = await instance.post("bookings/", formData);
      console.log('response is ::::::::::::', response);

      setSeats((prevSeats) =>
        prevSeats.map((prevSeat) =>
          prevSeat.id === formData.seat
            ? { ...prevSeat, is_booked_on_date: true }
            : prevSeat
        )
      );
      setSelectedSeat(null);
    } catch (error) {
      console.error("Error booking seat:", error);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Seat Map</h1>
        <div className="flex justify-center mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Select a Date"
          />
        </div>
        {selectedDate ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {seats.map((seat) => (
              <Seat
                key={seat.id}
                seat={seat}
                onClick={() => handleSeatClick(seat)}
                className="w-16 h-16 border rounded flex items-center justify-center cursor-pointer"
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Please select a date</div>
        )}
        {selectedSeat && (
          <BookingForm seat={selectedSeat} onSubmit={handleBookingSubmit} />
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 fixed top-4 right-4"
      >
        Logout
      </button>
    </>
  );
};

export default SeatMap;
