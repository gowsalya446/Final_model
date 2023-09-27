// BookingList.js

import React, { useEffect, useState } from 'react';
import "./Show-history.css"
function BookingList() {
  const [bookings, setBookings] = useState([]);
  const user = localStorage.getItem('id'); // Assuming you store user information in localStorage
console.log(user)
const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch booking data based on the user
    fetch(`http://127.0.0.1:8000/api/booking/${user}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]);

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0  ?  (
        
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
           <div >
            
            <ul key={booking.id} className='history'>
              


              <p>User: {booking.user}</p>
              <p>Movie: {booking.movie}</p>
              <p>Seat Numbers: {booking.seat_number.join(', ')}</p>
            <p>Total Cost: Rs.{booking.total_cost.toFixed(2)}</p>

            </ul>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingList;
