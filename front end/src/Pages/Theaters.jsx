import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Theaters.css"
import { useParams } from 'react-router-dom'; // Assuming you're using React Router



const TheaterList = () => {
  const { movieId } = useParams(); // Get the movie ID from the URL parameter

  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/theater/${movieId}`,
    {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTheaters(data);
        setLoading(false); // Data has been loaded
      })
      .catch((err) => {
        setError(err);
        setLoading(false); // Data retrieval failed
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(theaters)) {
    return <div>No theaters data available</div>;
  }

  return (
    <div className='con-ba'>
   <div className="container">
    <br></br>
    <h2>Theater List</h2>
    <br></br>
    <div className="row">
      {theaters.map((theater) => (
        <div key={theater.id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{theater.name}</h5>
              <p className="card-text">Location: {theater.location}</p>
              <p className="card-text">City: {theater.city}</p>
              <p className="card-text">Pincode: {theater.pincode}</p>
              <a href="/Booking"  className="btn btn-primary">Select Theatre</a>

            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

    </div>
  );
};

export default TheaterList;
