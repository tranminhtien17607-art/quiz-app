import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://v2.jokeapi.dev/joke';

export default function useJoke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async (category = 'Any') => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = category === 'Any' 
        ? `${API_BASE_URL}/Any?type=single,twopart`
        : `${API_BASE_URL}/${category}?type=single,twopart`;

      const response = await axios.get(endpoint);
      
      if (response.data.error) {
        setError('Failed to fetch joke. Try again!');
        setJoke(null);
      } else {
        setJoke(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Error fetching joke. Please check your internet connection.');
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial joke on mount
  useEffect(() => {
    fetchJoke();
  }, []);

  return { joke, loading, error, fetchJoke };
}
