import React, { useState } from "react";
import instance from "./Axios";

const BookingForm = ({ seat, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    seat: seat.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData); // Pass formData to onSubmit function
    } catch (error) {
      console.error("Error booking seat:", error);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3 className="text-xl mb-4">Booking Seat {seat.seat_number}</h3>
      <div className="mb-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Book Seat
      </button>
    </form>
  );
};

export default BookingForm;
