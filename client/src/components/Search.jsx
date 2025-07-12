import React, { useState } from 'react';

const Search = ({ onResult }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    setLoading(true);
    setError(null);
    onResult(null); // Clear previous results

    try {
      const response = await fetch('http://localhost:5000/api/get-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch video information.');
      }

      const data = await response.json();
      onResult(data); // Pass the real data to App.jsx
    } catch (err) {
      console.error('Error fetching video info:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[700px] h-20 overflow-hidden rounded-2xl flex items-center my-20'>
      <input
        type="search"
        placeholder='eg: https://youtu.be/videourl'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className='h-full flex-1 bg-light outline-0 border-0 px-8'
        disabled={loading}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className='text-lighter font-semibold bg-dark px-8 h-full'
        disabled={loading}
      >
        {loading ? 'LOADING...' : 'FIND'}
      </button>
      {error && <p className="text-red-500 absolute mt-24 text-sm">{error}</p>}
    </div>
  );
};

export default Search;