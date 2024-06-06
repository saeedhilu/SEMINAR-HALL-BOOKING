import React, { useState, useEffect } from "react";
import instance from './Axios'
import Seat from './Seat'
import BookingForm from "./BookingForm";

export const SeatMap = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const fetchSeats = async () => {
    try {
      const response = await instance.get("seats/");
      {console.log('====================================');
      console.log('response is :./////////////////////',response);
      console.log('====================================');}
      setSeats(response.data);
    } catch (error) {
      console.log('caghted error is ',error);
    }
  };

  
  useEffect(() => {
    fetchSeats();
  },[]);
  const handleSeatClick = (seat)=>{
    setSelectedSeats(seat)
  }
  const handleBookingSubmit = (booking) =>{
    setSeats(seats.map(seat => seat.id === booking.seat.id ? {...seat, is_booked:true}:seat))
    setSelectedSeats([])
  }

  return (
    <div className="set-map">
        {seats.map(seat =>(
            <Seat key={seat.id} seat={seat} onClick={() => handleSeatClick(seat)} />
        ))}
        {selectedSeats && <BookingForm seat={selectedSeats} onSubmit={handleBookingSubmit} />}
    </div>
  );
};

export default SeatMap;