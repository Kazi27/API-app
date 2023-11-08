import React, { useState } from 'react';

const Parliament = () => {
  // State hooks for party member data
  const [memberName, setMemberName] = useState('');
  const [fullMemberName, setFullMemberName] = useState(null);
  const [partyInfo, setPartyInfo] = useState(null);
  const [gender, setGender] = useState(null);
  const [latestMembership, setLatestMembership] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [membershipEnd, setMembershipEnd] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState(null);
  const [error, setError] = useState(null);

  // State hooks for treaty data
  const [treatyName, setTreatyName] = useState('');
  const [treatyId, setTreatyId] = useState(null);
  const [treatyTitle, setTreatyTitle] = useState(null);
  const [treatyError, setTreatyError] = useState(null);

  // Function to fetch treaty data from an API
  const fetchTreatyData = async (treaty) => {
    try {
      const response = await fetch(`https://treaties-api.parliament.uk/api/Treaty?SearchText=${encodeURIComponent(treaty)}`);
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        // Assuming we are interested in the first treaty found
        const treatyData = data.items[0].value;
        setTreatyId(treatyData.id);
        setTreatyTitle(treatyData.name);
        // ... set other state variables as needed
      } else {
        setTreatyError('Treaty information not found.');
      }
    } catch (e) {
      setTreatyError('Failed to fetch treaty information.');
      console.error(e);
    }
  };
  

  // Function to fetch party member data from an API
  const fetchPartyData = async (name) => {
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

  // Function to handle party member form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    resetMemberInfo();
    fetchPartyData(memberName);
  };

  // Function to handle treaty form submission
  const handleSubmitTreaty = (event) => {
    event.preventDefault();
    resetTreatyInfo();
    fetchTreatyData(treatyName);
  };

  // Function to reset party member info states
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

  // Function to reset treaty info states
  const resetTreatyInfo = () => {
    setTreatyId(null);
    setTreatyTitle(null);
    setTreatyError(null);
  };

  // Function to update memberName state when user input changes
  const handleMemberNameChange = (event) => {
    setMemberName(event.target.value);
  };

  // Function to update treatyName state when user input changes
  const handleTreatyNameChange = (event) => {
    setTreatyName(event.target.value);
  };

  return (
    <div>
      <h2>Party Information</h2>
      <h3>Parliament Name Examples: Rishi Sunak, Keir Starmer, Suella Braverman, Grant Shapps etc</h3>
      <form onSubmit={handleSubmit}>
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

      <h2>Treaty Information</h2>
      <h3>Treaty Name Examples: Treaty of Rome, Treaty of Lisbon etc</h3>
      <form onSubmit={handleSubmitTreaty}>
        <label>
          Input Treaty Name:
          <input
            type="text"
            value={treatyName}
            onChange={handleTreatyNameChange}
          />
        </label>
        <button type="submit">Display Info</button>
      </form>

      {treatyError && <p>Error: {treatyError}</p>}
      {treatyId && <p>Treaty ID: {treatyId}</p>}
      {treatyTitle && <p>Treaty Title: {treatyTitle}</p>}
    </div>
  );
};

export default Parliament;
