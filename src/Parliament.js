import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMemberInfo, setInterests, setError } from './slices/ParliamentSlice';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Parliament = () => {
  const dispatch = useDispatch();
  const { memberInfo, interests, error } = useSelector((state) => state.parliament);

  const [memberName, setMemberName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMemberData = async (name) => {
    try {
      const response = await fetch(`https://members-api.parliament.uk/api/Members/Search?Name=${encodeURIComponent(name)}&skip=0&take=20`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const member = data.items[0].value;
        dispatch(setMemberInfo({
          fullMemberName: member.nameFullTitle,
          gender: member.gender,
          partyInfo: member.latestParty.name,
          latestMembership: member.latestHouseMembership.membershipFrom,
          startDate: member.latestHouseMembership.membershipStartDate,
          membershipEnd: member.latestHouseMembership.membershipEndDate,
          membershipStatus: member.latestHouseMembership.membershipStatus.statusDescription,
        }));
      } else {
        dispatch(setError('Party information not found for this member.'));
      }
    } catch (e) {
      dispatch(setError('Failed to fetch party information.'));
      console.error(e);
    }
  };

  const fetchInterestsData = async (term) => {
    try {
      const response = await fetch(`https://members-api.parliament.uk/api/LordsInterests/Register?searchTerm=${encodeURIComponent(term)}`);
      const data = await response.json();

      if (data.items) {
        dispatch(setInterests(data.items));
      } else {
        dispatch(setError('No interests found for the specified search term.'));
      }
    } catch (e) {
      dispatch(setError('Failed to fetch interests information.'));
      console.error(e);
    }
  };

  const handleMemberSubmit = (event) => {
    event.preventDefault();
    dispatch(setMemberInfo(null)); // Reset memberInfo state
    dispatch(setError(null)); // Reset error state
    fetchMemberData(memberName);
  };

  const handleInterestsSubmit = (event) => {
    event.preventDefault();
    dispatch(setInterests([])); // Reset interests state
    dispatch(setError(null)); // Reset error state
    fetchInterestsData(searchTerm);
  };

  const handleMemberNameChange = (event) => {
    setMemberName(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
      {interests && interests.length > 0 && (
        <div>
          <p>Name of member with this interest:</p>
          <ul>
            {interests.map((interest, index) => (
              <li key={index}>{interest.value.member.nameFullTitle}</li>
            ))}
          </ul>
        </div>
      )}
      {memberInfo && (
        <div>
          <p>Name: {memberInfo.fullMemberName}</p>
          <p>Gender: {memberInfo.gender}</p>
          <p>Party: {memberInfo.partyInfo}</p>
          <p>Latest Membership: {memberInfo.latestMembership}</p>
          <p>Start Date: {memberInfo.startDate}</p>
          <p>Membership End: {memberInfo.membershipEnd}</p>
          <p>Membership Status: {memberInfo.membershipStatus}</p>
        </div>
      )}
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
    <p>Name of member with this interest:</p>
    <ul>
      {interests.map((interest, index) => (
        <li key={index}>{interest.value.member.nameFullTitle}</li>
      ))}
    </ul>
  </div>
)}
<br></br>

<br></br>
<br></br>
<div style={{ textAlign: 'center' }}>
<p>I want to</p>
</div>

<div className="linkText">
  <Link to="/API-app/congress">explore the US congress</Link>
  <Link to="/API-app">go back to the homepage</Link>
</div>

    </div>
  );
};

export default Parliament;