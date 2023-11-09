import React, { useState } from 'react';

function Congress() 
{
  //state variables for member stuff - george
  const [memberName, setMemberName] = useState('L000174');
  const [fullMemberName, setFullMemberName] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [usState, setUSstate] = useState("");
  const [party, setParty] = useState("");
  const [memberType, setMemberType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //state variables for treaty stuff - kazi
  const [treatyInput, setTreatyInput] = useState('116'); //just an example of input
  const [treatyData, setTreatyData] = useState(null); //default vals for this and below
  const [trans, setTreatyTrans] = useState(null);
  //const [rat, setTreatyRat] = useState(null);

  //function to fetch member data - george
  const fetchPartyData = async (name) => 
  {
    setIsLoading(true);
    setError(null);
  
    try 
    {
      const response = await fetch(`https://api.congress.gov/v3/member/${encodeURIComponent(name)}?api_key=${process.env.REACT_APP_API_KEY}`); //fetch data from the API, env file stores the api key
      
      if (!response.ok) //check if api fetch was successfu or not
      {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the response contains items
      let objectLength = Object.keys(data.member).length;

      if (data.member && objectLength > 0) 
      {
        // parsing the data about Congress Member
        const member = data.member;
        const fullName = member.directOrderName; 
        const photo = member.depiction.imageUrl;
        const state = member.state;
        const party = member.partyHistory[0].partyName;
        const memberType = member.terms.pop().memberType;
        
        //update state variables with member information
        setFullMemberName(fullName);
        setImageUrl(photo);
        setUSstate(state);
        setParty(party);
        setMemberType(memberType);

      } 
      
      else 
      {
        //if no information found
        setError('No information not found for this member.');
      }
    } 
    
    catch (e) 
    {
      if (e.name === "TypeError" && e.message === "Failed to fetch") //netwrok error catch
      {
        setError("Network error. Please check your internet connection.");
      } 
      
      else 
      {
        setError(`Failed to fetch data: ${e.message}`);
      }
      
      console.error(e); //log it
    }
  
    setIsLoading(false); //fasle if u encounter an error
  };

  const handleSubmit = (event) => 
  {
    event.preventDefault();
    fetchPartyData(memberName); //call function to fetch member data
  };


  const handleMemberNameChange = (event) => 
  {
    setMemberName(event.target.value); //update member name state with input value
  };

  //fetch treaty data
  const fetchTreatyData = async (input) => 
  {
    setIsLoading(true); //same explanation as member func
    setError(null);
  
    try 
    {
      //fetch data from the API, env file stores the api key
      //const response = await fetch(`https://api.congress.gov/v3/member/${encodeURIComponent(name)}?api_key=${process.env.REACT_APP_API_KEY}`);
      const response = await fetch(`https://api.congress.gov/v3/treaty/${encodeURIComponent(input)}?api_key=${process.env.REACT_APP_API_KEY}`);
      //const response = await fetch(`https://api.congress.gov/v3/treaty?api_key=${process.env.REACT_APP_API_KEY}&q=${encodeURIComponent(input)}`);

      if (!response.ok) //is api call successful
      {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();//parse
  
      if (data.treaties && data.treaties.length > 0) //extract info
      {
        const treaty = data.treaties[0];
        const treatySubject = treaty.treatySubject;
        const transmittedDate = treaty.transmittedDate;
        //const ratifiedCongress = treaty.ratifiedCongress; encoded in CDATA file and idk how to parse through that

        // setTreatyData(treatySubject, transmittedDate, ratifiedCongress);
        // setTreatyTrans(transmittedDate);
        // setTreatyRat(ratifiedCongress);

        setTreatyData({treatySubject, transmittedDate,}); //set treaty as an obj, removed ratifiedCongress,
      } 
      
      else 
      {
        setError('No information found for this treaty input.');
      }
    } 
    
    catch (e) 
    {
      console.error(e); //log error
      setError(`Failed to fetch treaty data: ${e.message}`);
    }
  
    setIsLoading(false);
  };

  //event handler for submitting the treaty form
  const handleTreatySubmit = (event) => 
  {
    event.preventDefault();
    fetchTreatyData(treatyInput);
  };

  //vvent handler for updating the treaty input field
  const handleTreatyInputChange = (event) => 
  {
    setTreatyInput(event.target.value);
  };
  
    return (
      <div className="center-container">
      <div>
        <h1>Congress Page</h1>
        <h1>Conter divs unless centered already, make it look nice, gray background or something, upto you jsut make it look good</h1>

        <h3>Party Information</h3>
        <h5> Possible inputs: K000377, L000174, include the screenshot or just rewrite it, explain what a bioguideid is and hwo to make it</h5>
      <form onSubmit={handleSubmit}>
      <div className="member-name-section">
        <label>
          Congress Member Name:
          <input
            type="text"
            value={memberName}
            onChange={handleMemberNameChange}
          />
        </label>
        <button type="submit">Search Name</button>
      </div>
      </form>

      {fullMemberName && (
        <div>
          <img src={imageUrl}/>
          <p>Full Member Name: {fullMemberName}</p>
          <p>Member Type: {memberType}</p>
          <p>State: {usState}</p>
          <p>Party: {party}</p>
        </div>
      )}

      <h3>Treaty Information</h3>
      <h5> Possible inputs: 99, somethig 80, 90 etc etc we need to find the range, 111, 112, 114, 116, 117</h5>
      <form onSubmit={handleTreatySubmit}>
      <div className="member-name-section">
        <label>
          Congress Treaty Information:
          <input
            type="text"
            value={treatyInput}
            onChange={handleTreatyInputChange}
          />
        </label>
        <button type="submit">Search Treaty</button>
      </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      

      {treatyData && (
        <div>
          {/* <p>Treaty Information: {treatyData}</p>
          <p>Date Transmitted: {treatyData.transmittedDate}</p>
          <p>Congress Ratified: {treatyData.ratifiedCongress}</p> */}
          <p>Treaty Subject: {treatyData.treatySubject}</p>
          <p>Transmitted Date: {treatyData.transmittedDate}</p>
          
        </div>
      )}

      </div>
      </div>
    );
}

export default Congress;