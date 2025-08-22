import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../services/tmdb';
import './MovieDetailsPage.css'; 

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(movieId)
      .then(data => setMovie(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading movie details...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Error: {error.message}</p>;
  }

  if (!movie) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Movie not found.</p>;
  }

  const { title, overview, poster_path, release_date, vote_average } = movie;

  return (
    <div style={{ maxWidth: '100vh', margin: '0 auto', padding: '20px' }}>
      <Link to={backLinkRef.current} 
      style={{ 
        display: 'inline-block', 
        marginBottom: '20px', 
        color: '#df3a3aff', 
        fontWeight: 'bold',
        textDecoration: 'none',
        border: '1px solid #9a2121ff',
        padding: '8px 16px',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
        
        }}>
        Go back
      </Link>

      <div style={{ display: 'flex', gap: '20px' }}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : 'https://via.placeholder.com/300x450'
          }
          alt={title}
          style={{ borderRadius: '8px'  }}
        />
        <div className="movie-details">
  <h2 className="movie-title">
    {title} ({release_date?.slice(0, 4)})
  </h2>
  <p className="movie-rating">
    ⭐ <strong>Rating:</strong> {vote_average}
  </p>

  <h3 className="section-title">Overview</h3>
  <p className="movie-overview">{overview}</p>

  <h3 className="section-title">Additional information</h3>


       <ul className="movie-subnav">
  <li>
    <Link to={`/movies/${movieId}/cast`} className="subnav-link">
      Cast
    </Link>
  </li>
  <li>
    <Link to={`/movies/${movieId}/reviews`} className="subnav-link">
      Reviews
    </Link>
  </li>
</ul>


        </div>
      </div>

      {/* Alt rotalar */}
      <Suspense fallback={<p style={{ textAlign: 'center', marginTop: '20px' }}>Loading section...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
