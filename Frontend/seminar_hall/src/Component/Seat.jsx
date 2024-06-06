import React from 'react'

export const Seat = (seat,onclick) => {
    const handleClick= () =>{
        if (! seat.is_booked){
            onclick(seat)
        }
    }
  return (
    <div className={`seat ${seat.is_booked ? 'booked' : ''}`} onClick={handleClick}>
        {seat.seat_number}
    </div>
  )
}

export default Seat;