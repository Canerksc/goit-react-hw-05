import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdb';
import MovieList from '../components/MovieList';
import './SearchForm.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  // Film arama useEffect
  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    searchMovies(query)
      .then(data => setMovies(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [query]);

  // Form gönderimi
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (!searchQuery) {
      alert('Lütfen bir film adı girin.');
      return;
    }

    setSearchParams({ query: searchQuery });
    form.reset();
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Search Movies</h1>

      <form onSubmit={handleSubmit} className="search-form">
  <input
    type="text"
    name="query"
    defaultValue={query}
    placeholder="Search for a movie..."
    className="search-input"
  />
  <button type="submit" className="search-button">
    Search
  </button>
</form>

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center' }}>Error: {error.message}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && query && movies.length === 0 && (
        <p style={{ textAlign: 'center' }}>No movies found for "{query}".</p>
      )}
    </div>
  );
}
