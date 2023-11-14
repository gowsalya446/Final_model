import React, { useState } from 'react';
import { FaCouch } from 'react-icons/fa';
import "./Booking.css"

function SeatSelection(){
    const [isClicked, setIsClicked] = useState(false);
    const token = localStorage.getItem("token");

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/seat/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            console.log('Booking is successful');
            console.log(values)
            // You can handle success, e.g., show a confirmation message
          } else {
            console.error('Booking failed');
            console.log(values)
            // Handle failure or display an error message
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle error or display an error message
        } finally {
          setSubmitting(false);
        }
      };
    return (
    <div className='page'>
        <h3 classname='seat-p'>Seat selection page</h3>
        <div className='seat'>
         <FaCouch className="seat-icon image i" />
         <FaCouch className="seat-icon image i" />
         <FaCouch className="seat-icon image i" />
         <FaCouch className="seat-icon image i" />
         <FaCouch className="seat-icon image i" />
         <FaCouch className="seat-icon image i" />
         </div>
         <a href="/ticket"  className="btn btn-primary fa">select the seat</a>

    </div>
        );
      
}
  

export default SeatSelection;
