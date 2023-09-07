import React, { useState, useEffect } from 'react';
import "./Filter.css"

function Filter() {
  const token = localStorage.getItem("Access_token");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
     const apiUrl = `http://127.0.0.1:8000/api/movies?genre=${genre}&language=${language}&location=${location}&rating=${rating}`;
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
        <div>
          {movies.map(movie => (
            <div key={movie.id} className="card" style={{ width: "18rem" }}>
              <img src={movie.image} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Filter;
