import React, { useState } from 'react';

const Parliament = () => {
  // State hooks for member data
  const [memberName, setMemberName] = useState('');
  // state to hold the values of the currently searched parliament member's name, gender, party, and membership information
  const [fullMemberName, setFullMemberName] = useState(null);
  const [partyInfo, setPartyInfo] = useState(null);
  const [gender, setGender] = useState(null);
  const [latestMembership, setLatestMembership] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [membershipEnd, setMembershipEnd] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState(null);
  //used for error handling and used in cases where the inputted name is blank or not a part of the api dataset 
  const [error, setError] = useState(null);

  // State hooks for registered interests data
  const [searchTerm, setSearchTerm] = useState('');
  const [interests, setInterests] = useState([]);
  //used for error handling and used in cases where the inputted name is blank or not a part of the api dataset 
  const [interestsError, setInterestsError] = useState(null);

  // Function to fetch member data from an API
  const fetchMemberData = async (name) => {
    try {
      const response = await fetch(`https://members-api.parliament.uk/api/Members/Search?Name=${encodeURIComponent(name)}&skip=0&take=20`);
      const data = await response.json();
//states for treaties
      if (data.items && data.items.length > 0) {
        const member = data.items[0].value;
        setFullMemberName(member.nameFullTitle);
        setGender(member.gender);
        setPartyInfo(member.latestParty.name);
        setLatestMembership(member.latestHouseMembership.membershipFrom);
        setStartDate(member.latestHouseMembership.membershipStartDate);
        setMembershipEnd(member.latestHouseMembership.membershipEndDate);
        setMembershipStatus(member.latestHouseMembership.membershipStatus.statusDescription);
      } else {
        setError('Party information not found for this member.');
      }
    } catch (e) {
      setError('Failed to fetch party information.');
      console.error(e);
    }
  };

  // Function to fetch registered interests data from an API
  const fetchInterestsData = async (term) => {
    try {
        //Making an HTTP request to the Parliament api
      const response = await fetch(`https://members-api.parliament.uk/api/LordsInterests/Register?searchTerm=${encodeURIComponent(term)}`);
        //response is parsed here
      const data = await response.json();
        // Check if the response contains items
      if (data.items) {
        setInterests(data.items);
      } else {
          // if the response body does not contain any items at all, display this error message 
        setInterestsError('No interests found for the specified search term.');
      }
    } catch (e) {
      // catch any potential errors and display it
      setInterestsError('Failed to fetch interests information.');
      console.error(e);
    }
  };

  // Function to handle member form submission
  const handleMemberSubmit = (event) => {
    event.preventDefault();
    resetMemberInfo();
    fetchMemberData(memberName);
  };

  // Function to handle registered interests form submission
  const handleInterestsSubmit = (event) => {
    event.preventDefault();
    resetInterestsInfo();
    fetchInterestsData(searchTerm);
  };

//Reset the previous members data to be null to allow for new data or error message to be displayed
const resetMemberInfo = () => {
    setFullMemberName(null);
    setPartyInfo(null);
    setGender(null);
    setLatestMembership(null);
    setStartDate(null);
    setMembershipEnd(null);
    setMembershipStatus(null);
    setError(null);
  };

  // Function to reset registered interests states
  const resetInterestsInfo = () => {
    setInterests([]);
    setInterestsError(null);
  };

  // Function to update memberName state when user input changes
  const handleMemberNameChange = (event) => {
    setMemberName(event.target.value);
  };

  // Function to update searchTerm state when user input changes
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  {
    /* This section displays the member's 
  full name
  party
  gender
  latestmembership placement
  latest membership start date
  latest membership end date if they are not currently in office
  membership status
  
  */}
  return (
<div className="parliament-container">
<h2 className="parliament-heading">Party Information</h2>
      <h3>Parliament Member Name Examples: Rishi Sunak, Keir Starmer, Suella Braverman, Grant Shapps, etc</h3>
      <form onSubmit={handleMemberSubmit}>
        <label>
          Input Parliament Member's Name:
          <input
          className="parliament-input"
            type="text"
            value={memberName}
            onChange={handleMemberNameChange}
          />
        </label>
        <button className="parliament-button" type="submit">Display Info</button>
      </form>

      {error && <p>Error: {error}</p>}
      {fullMemberName && <p>Name: {fullMemberName}</p>}
      {gender && <p>Gender: {gender}</p>}
      {partyInfo && <p>Party: {partyInfo}</p>}
      {latestMembership && <p>Latest Membership: {latestMembership}</p>}
      {startDate && <p>Start Date: {startDate}</p>}
      {membershipEnd && <p>Membership End: {membershipEnd}</p>}
      {membershipStatus && <p>Membership Status: {membershipStatus}</p>}
<br></br>
<br></br>
<br></br>

      <h2 className="parliament-heading">Registered Interests</h2>
      <h3>Search Term Examples: Business, Environment, Health, etc</h3>
      <form onSubmit={handleInterestsSubmit}>
        <label>
          Input Search Term:
          <input
                    className="parliament-input"

            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </label>
        <button className="parliament-button"  type="submit">Display Interests</button>
      </form>

      {error && <p className="parliament-error">Error: {error}</p>}

{interests.length > 0 && (
  <div>
    <p>Registered Interests:</p>
    <ul>
      {interests.map((interest, index) => (
        <li key={index}>{interest.value.member.nameFullTitle}</li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default Parliament;