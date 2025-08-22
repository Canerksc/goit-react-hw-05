import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../services/tmdb';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieReviews(movieId)
      .then(data => setReviews(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading reviews...</p>;
  if (error) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Error: {error.message}</p>;
  if (reviews.length === 0) return <p style={{ textAlign: 'center', marginTop: '20px' }}>No reviews available.</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id} 
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            padding: '10px',
            listStyle:'none', 
            marginBottom: '20px', 
            borderBottom: '1px solid #ddd', 
            paddingBottom: '10px', 
            border:'1px solid #00000050', 
            borderRadius: '8px'
            }}>
            <p><strong>Author:</strong> {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
