import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN; 

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Trend filmleri çekme hatası:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Film arama hatası:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    console.error('Film detayları çekilemedi:', error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data.cast;
  } catch (error) {
    console.error('Oyuncu bilgisi çekilemedi:', error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data.results;
  } catch (error) {
    console.error('İnceleme çekilemedi:', error);
    throw error;
  }
};
