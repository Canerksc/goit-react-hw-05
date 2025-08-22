import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../services/tmdb';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieCast(movieId)
      .then(data => setCast(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading cast...</p>;
  if (error) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Error: {error.message}</p>;
  if (cast.length === 0) return <p style={{ textAlign: 'center', marginTop: '20px' }}>No cast information available.</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Cast</h3>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {cast.map(actor => (
          <li key={actor.cast_id} style={{ listStyle: 'none', width: '150px', textAlign: 'center' }}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/150x225'}
              alt={actor.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p>{actor.name}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
