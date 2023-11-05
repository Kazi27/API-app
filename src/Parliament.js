import React, { useState } from 'react';

const YourComponent = () => {
  const [memberName, setMemberName] = useState('');
  const [gender, setGender] = useState(null);
  const [partyInfo, setPartyInfo] = useState(null);
  const [fullMemberName, setFullMemberName] = useState(null);
  const [latestMembership, setLatestMembership] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchPartyData = async (name) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`https://members-api.parliament.uk/api/Members/Search?Name=${encodeURIComponent(name)}&skip=0&take=20`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      // Check if the response contains items
      if (data.items && data.items.length > 0) {
        // parsing the data about the party member
        const member = data.items[0].value;
        const fullName = member.nameFullTitle; 
        const memberGender = member.gender;
        const party = member.latestParty.name;
        const recentMembership = member.latestHouseMembership.membershipFrom;
        const startTime = member.latestHouseMembership.membershipStartDate;




        setStartDate(startTime);
        setLatestMembership(recentMembership);
        setGender(memberGender);
        setPartyInfo(party);
        setFullMemberName(fullName);
      } else {
        setError('Party information not found for this member.');
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
      <h2>Party Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Member Name:
          <input
            type="text"
            value={memberName}
            onChange={handleMemberNameChange}
          />
        </label>
        <button type="submit">Search Party</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {partyInfo && (
        <div>
          <p>Party: {partyInfo}</p>
        </div>
      )}
      {fullMemberName && (
        <div>
          <p>Full Member Name: {fullMemberName}</p>
        </div>
      )}
      {
        gender && (
          <div>
            <p>Member Gender: {gender}</p>
          </div>
        )
      }
      {
        latestMembership && (
          <div>
            <p>Latest Membership: {latestMembership}</p>
          </div>
        )
      }
      {
        startDate && (
          <div>
            <p>Membership Start Date: {startDate}</p>
          </div>
        )
      }
    </div>
  );
};

export default YourComponent;
