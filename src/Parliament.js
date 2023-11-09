import React, { useState } from 'react';

const Parliament = () => {
  // State hooks for member data
  const [memberName, setMemberName] = useState('');
  const [fullMemberName, setFullMemberName] = useState(null);
  const [partyInfo, setPartyInfo] = useState(null);
  const [gender, setGender] = useState(null);
  const [latestMembership, setLatestMembership] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [membershipEnd, setMembershipEnd] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState(null);
  const [error, setError] = useState(null);

  // State hooks for registered interests data
  const [searchTerm, setSearchTerm] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestsError, setInterestsError] = useState(null);

  // Function to fetch member data from an API
  const fetchMemberData = async (name) => {
    try {
      const response = await fetch(`https://members-api.parliament.uk/api/Members/Search?Name=${encodeURIComponent(name)}&skip=0&take=20`);
      const data = await response.json();

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
      const response = await fetch(`https://members-api.parliament.uk/api/LordsInterests/Register?searchTerm=${encodeURIComponent(term)}`);
      const data = await response.json();

      if (data.items) {
        setInterests(data.items);
      } else {
        setInterestsError('No interests found for the specified search term.');
      }
    } catch (e) {
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

  // Function to reset member info states
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

  return (
    <div>
      <h2>Party Information</h2>
      <h3>Parliament Member Name Examples: Rishi Sunak, Keir Starmer, Suella Braverman, Grant Shapps, etc</h3>
      <form onSubmit={handleMemberSubmit}>
        <label>
          Input Parliament Member's Name:
          <input
            type="text"
            value={memberName}
            onChange={handleMemberNameChange}
          />
        </label>
        <button type="submit">Display Info</button>
      </form>

      {error && <p>Error: {error}</p>}
      {fullMemberName && <p>Name: {fullMemberName}</p>}
      {gender && <p>Gender: {gender}</p>}
      {partyInfo && <p>Party: {partyInfo}</p>}
      {latestMembership && <p>Latest Membership: {latestMembership}</p>}
      {startDate && <p>Start Date: {startDate}</p>}
      {membershipEnd && <p>Membership End: {membershipEnd}</p>}
      {membershipStatus && <p>Membership Status: {membershipStatus}</p>}

      <h2>Registered Interests</h2>
      <h3>Search Term Examples: Business, Environment, Health, etc</h3>
      <form onSubmit={handleInterestsSubmit}>
        <label>
          Input Search Term:
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </label>
        <button type="submit">Display Interests</button>
      </form>

      {interestsError && <p>Error: {interestsError}</p>}

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