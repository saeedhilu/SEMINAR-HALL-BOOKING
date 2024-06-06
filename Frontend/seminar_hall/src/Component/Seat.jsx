import React from 'react';

const Seat = ({ seat, onClick }) => {
  const handleClick = () => {
    if (!seat.is_booked) {
      onClick(seat);
    }
  };

  return (
    <div
      className={`seat p-4 text-center border rounded cursor-pointer ${
        seat.is_booked ? 'bg-red-500' : 'bg-green-500'
      }`}
      onClick={handleClick}
    >
      {seat.seat_number}
    </div>
  );
};

export default Seat;
