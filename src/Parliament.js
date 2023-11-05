import React, { useState } from 'react';

const Parliament = () => {
// used for handling the name inputted by the user
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



// function to perform an HTTP GET request from the Parliament API
const fetchPartyData = async (name) => {


try {
  //Making an HTTP request to the Parliament api
  const response = await fetch(`https://members-api.parliament.uk/api/Members/Search?Name=${encodeURIComponent(name)}&skip=0&take=20`);
  
  //response is parsed here
  const data = await response.json();

  // Check if the response contains items
  if (data.items && data.items.length > 0) 
  {
    // parsing the data about the party member
    const member = data.items[0].value;
    const fullName = member.nameFullTitle; 
    const memberGender = member.gender;
    const party = member.latestParty.name;
    const recentMembership = member.latestHouseMembership.membershipFrom;
    const startTime = member.latestHouseMembership.membershipStartDate;
    const endTime = member.latestHouseMembership.membershipEndDate;
    const statusOfMembership = member.latestHouseMembership.membershipStatus.statusDescription;

    //setting the states to the parsed values from the response body
    setMembershipStatus(statusOfMembership);
    setMembershipEnd(endTime);
    setStartDate(startTime);
    setLatestMembership(recentMembership);
    setGender(memberGender);
    setPartyInfo(party);
    setFullMemberName(fullName);
  } 
  // if the response body does not contain any items at all, display this error message 
  else 
  {
  setError('Party information not found for this member.');
  }

} 
// catch any potential errors and display it
catch (e) 
{
  setError('Party information not found for this member.');
  console.error(e);
}

};

// function for when the user submits the form
const handleSubmit = (event) => {
// stops the page from reloading when the form is submitted
event.preventDefault();

//Reset the previous members data to be null to allow for new data or error message to be displayed

setFullMemberName(null);
setPartyInfo(null);
setGender(null);
setLatestMembership(null);
setStartDate(null);
setMembershipEnd(null);
setMembershipStatus(null);

//resets the value of the error
setError(null);
//performs a GET request using the inputted name by the user
fetchPartyData(memberName);


};
// used to update the member name when the user inputs a different name
const handleMemberNameChange = (event) => {
setMemberName(event.target.value);
};

return (
<div>
  {/* displays the header of the page (Party Information) */}
  <h2>Party Information</h2>
  {/* Input field where the user must input a valid parliament members name and click search. If present in the api, information about the party member is present.  */}
  <form onSubmit={handleSubmit}>
    <label>
      Input Parliament Member's Name: 
      <input
        type="text"
        value={memberName}
        onChange={handleMemberNameChange}
      />
    </label>
    <button type="submit"> Display Info</button>
  </form>

  



  {/* This section displays the member's 
  full name
  party
  gender
  latestmembership placement
  latest membership start date
  latest membership end date if they are not currently in office
  membership status
  
  */}
  {error && <p>Error: {error}</p>}
  {fullMemberName && (
    <div>
      <p>Full Name: {fullMemberName}</p>
    </div>
  )}
  
  {partyInfo && (
    <div>
      <p>Party: {partyInfo}</p>
    </div>
  )}
  {
    gender && (
      <div>
        <p>Gender: {gender}</p>
      </div>
    )
  }
  {
    latestMembership && (
      <div>
        <p>Latest Membership Placement: {latestMembership}</p>
      </div>
    )
  }
  {
    startDate && (
      <div>
        <p>Latest Membership Start Date: {startDate}</p>
      </div>
    )
  }
  {
    membershipEnd && (
      <div>
        <p>Latest Membership End Date: {membershipEnd}</p>
      </div>
    )
  }
  {
    membershipStatus && (
      <div>
        <p>Membership Status: {membershipStatus}</p>
      </div>
    )
  }
</div>
);
};

export default Parliament;
