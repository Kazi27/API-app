import React, { useState } from 'react';

function Congress() 
{
  const [memberName, setMemberName] = useState('L000174');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


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
      

      </div>
    );
}

export default Congress;
