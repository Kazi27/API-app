import React, { useState } from 'react';

function Congress() 
{
  const [memberName, setMemberName] = useState('L000174');
  const [fullMemberName, setFullMemberName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPartyData = async (name) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`https://api.congress.gov/v3/member/${encodeURIComponent(name)}?api_key=${process.env.REACT_APP_API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Check if the response contains items
      let objectLength = Object.keys(data.member).length;

      if (data.member && objectLength > 0) {
        // parsing the data about Congress Member
        const member = data.member;
        const fullName = member.directOrderName; 
 
        setFullMemberName(fullName);
      } else {
        setError('No information not found for this member.');
      }
    } catch (e) {
      if (e.name === "TypeError" && e.message === "Failed to fetch") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(`Failed to fetch data: ${e.message}`);
      }
      console.error(e);
    }
  
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPartyData(memberName);
  };


  const handleMemberNameChange = (event) => {
    setMemberName(event.target.value);
  };
    return (
      <div>
        <h1>Congress Page</h1>

        <h2>Party Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Congress Member Name:
          <input
            type="text"
            value={memberName}
            onChange={handleMemberNameChange}
          />
        </label>
        <button type="submit">Search Name</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {fullMemberName && (
        <div>
          <p>Full Member Name: {fullMemberName}</p>
        </div>
      )}

      </div>
    );
}

export default Congress;
