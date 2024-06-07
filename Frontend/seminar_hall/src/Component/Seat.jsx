import React from "react";

const Seat = ({ seat, onClick }) => {
  return (
    <div
      className={`p-4 rounded-md cursor-pointer ${
        seat.is_booked ? "bg-red-500" : "bg-green-500"
      }`}
      onClick={onClick}
    >
      <p className="text-center font-bold text-lg">{seat.seat_number}</p>
      <p className="text-center text-sm mt-2">
        {seat.is_booked ? "Booked" : "Available"}
      </p>
    </div>
  );
};

export default Seat;
