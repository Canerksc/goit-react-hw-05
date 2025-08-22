import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../services/tmdb';
import MovieList from '../components/MovieList';
import './Pages.css';


export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTrendingMovies()
      .then(data => setMovies(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading trending movies...</p>;
  if (error) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Error: {error.message}</p>;
  if (movies.length === 0) return <p style={{ textAlign: 'center', marginTop: '50px' }}>No trending movies found.</p>;

  return (
    <div>
        <div className="marquee-container">
  <div className="marquee-track">
    <span className="marquee-content">⭐ Trending Today ⭐ Popular Movies ⭐ Top Rated ⭐ Now Playing ⭐</span>
    <span className="marquee-content">⭐ Trending Today ⭐ Popular Movies ⭐ Top Rated ⭐ Now Playing ⭐</span>
    <span className="marquee-content">⭐ Trending Today ⭐ Popular Movies ⭐ Top Rated ⭐ Now Playing ⭐</span>
    <span className="marquee-content">⭐ Trending Today ⭐ Popular Movies ⭐ Top Rated ⭐ Now Playing ⭐</span>
  </div>
</div>
      <MovieList movies={movies} />
       </div>
    
  );
}
