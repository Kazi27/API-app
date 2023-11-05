import React, { useState } from 'react';

function Parliament() {
  const [location, setLocation] = useState('');
  const [parliamentInfo, setParliamentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchParliamentData = async (Location) => {
    setIsLoading(true);
    setError(null); // Reset errors

    try {
      // Replace `API_ENDPOINT` with your actual API endpoint
      const response = await fetch(`https://members-api.parliament.uk/api/Location/Browse/0/Location%20 ${encodeURIComponent(Location)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // or handle based on response.status
      }
      const data = await response.json();
      setParliamentInfo(data);
    } catch (e) {
      setError(`Failed to fetch data: ${e.message}`);
      console.error(e);
    }

    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchParliamentData(location);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div>
      <h1>Parliament Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter location:
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get Parliament Info'}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      {parliamentInfo && (
        <div>
          {/* Render your parliament information here */}
          <pre>{JSON.stringify(parliamentInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Parliament;
