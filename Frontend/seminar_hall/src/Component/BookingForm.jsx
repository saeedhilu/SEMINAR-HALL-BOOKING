import React, { useState } from 'react'
import instance from './Axios';

export const BookingForm = ({seat,  onSubmit} ) => {
    const [formData,setFormData] = useState({ name: '', email: '', date: '', seat_id: seat.id });

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormData({...formData,[name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('booking/',formData)
            onSubmit(response.data)
        } catch (error) {
            console.error('There was an error:', error);
        }
    };

  return (
    <form className='booking-form' onSubmit={handleSubmit} >
        <h3>Booking Seat {seat.seat_number}</h3>

        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <button type="submit">Book Seat</button>
    </form>
  )
}
export default BookingForm;