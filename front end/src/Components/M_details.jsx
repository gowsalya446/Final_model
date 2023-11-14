import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import "./M_details.css"
import { Link } from 'react-router-dom'; // Import Link


function MovieDetail(props) {
  const { movieId } = useParams(); // Get the movie ID from the URL parameter
  const token = localStorage.getItem("token");
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("Token:", token); // Add this line to check the token

  
  useEffect(() => {
    
    const apiUrl = `http://127.0.0.1:8000/api/movies/${movieId}`;
    console.log(apiUrl)
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      if (response.ok) {
       

        return response.json();
      } else if (response.status === 401) {
        // Token expired, perform the redirect here
        window.location.href = "/login";
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then(data => {
      console.log('API Data:', data); // Add this line to check the API response
      console.log('before',movie)
      setMovie(data);
      console.log('after',movie)
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data. Response status:', error.response.status);
  console.error('Error response body:', error.response.data); // If your server sends a detailed error message
  setLoading(false);
    });
  }, [movieId, token]);
  useEffect(() => {
    console.log('Movie:', movie); // Log the updated movie state
  }, [movie]);

  return (
    <div className="movie-detail">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container box">
          <div className="row">
            <div className="col-md-6">
              <img className='pic' src={movie[0].image} alt={movie.title} />
            </div>
            <div >
              <br/>
              <h2>{movie[0].title}</h2>
              <hr />
              <p>Genre: {movie[0].genre}</p>
              <p>Rating: {movie[0].rating}</p>
              <p>Location: {movie[0].loction}</p>
              <p>Language: {movie[0].language}</p>
              <p>Length: {movie[0].movie_length}mins</p>
              <p>Seats: {movie[0].total_seats}</p>


              <Link to={`/theatre/${movie[0].id}`}    className="btn btn-primary bt">Book Ticket</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
 