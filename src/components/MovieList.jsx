import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MovieList.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className="movie-list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-item">
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className="movie-link"
          >
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300x450'}
              alt={movie.title}
              className="movie-poster"
            />
            <p className="movie-title">{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
