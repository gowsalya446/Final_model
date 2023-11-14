import React, { useState, useEffect } from 'react';
import "./Filter.css"
import { Link } from 'react-router-dom'; // Import Link



function Filter() {
  const token = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [data, setData] = useState('');

 
  useEffect(() => {

     const apiUrl = `http://127.0.0.1:8000/api/movies/?genre=${genre}&language=${language}&location=${location}&rating=${rating}`;
    // const apiUrl = `http://127.0.0.1:8000/api/movies/`
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
      } else if (response.status === 401) { // Unauthorized
        // Token expired, perform the redirect here
        window.location.href = "/login";
        console.log(response)
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then(data => {
      console.log(data)
      setMovies(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      console.log(error)
      setLoading(false);
    });
   }, [genre, language, location, rating, token]);

  return (
    <div className="filter">
      <p className='p'>Select The Movie &nbsp;&nbsp;&nbsp;</p>
      <div className="class1">
        <label>&nbsp;By Genre:&nbsp;</label>
        <input
          type="text"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
      </div>
      <div className="class2">
        <label>&nbsp;By Language:&nbsp;</label>
        <input
          type="text"
          value={language}
          onChange={e => setLanguage(e.target.value)}
        />
      </div>
     
      <div className="class3">
        <label>&nbsp;By Location:&nbsp;</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <div className="class4">
        <label>&nbsp;By Rating:&nbsp;</label>
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container con">
  <div className="row">
    {movies.map(movie => (
      <div key={movie.id} className="col-md-4">
        
          <div className="card display" style={{ width: "18rem" }}>
            <img src={movie.image} className="card-img-top img" alt={movie.title} />
            <div className="card-body set">
              <h5 className="card-title">{movie.title}</h5>
              <div className='one'>
              <p className="card-text">Genre:{movie.genre}</p>
              <p className="card-text">Rating:{movie.rating}</p>
              </div>
              <div className='two'>

              <p className="card-text">Location:{movie.loction}</p>
              <p className="card-text">Language:{movie.language}</p>
              </div>
             
              {/* <a href="/theatre" className="btn btn-primary bt">Book Ticket</a> */}
              <Link to={`/theatre/${movie.id}`}    className="btn btn-primary bt">Book Ticket</Link>

              <br/> <br/>
              <Link to={`/moviedetails/${movie.id}`}>ViewDetail</Link>

            </div>
            
          </div>
        </div>
      
    ))}
  </div>
</div>

      )}
    </div>
  );
}
export default Filter;
