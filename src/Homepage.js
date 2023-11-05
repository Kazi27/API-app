import React from 'react';
import UKParliamentImage from './UKParliament.png';
import USCongressImage from './USCongress.png';
import { Link } from 'react-router-dom'; //imports link component from the library

function Homepage() 
{
  return (
    <div className="homepage">
      <h1>The US Congress & The UK Parliament</h1>
      <h2>A website by the Lally Enthusiasts</h2>

      <div className="image-container">
        <img src={USCongressImage} alt="US Congress" />
        <img src={UKParliamentImage} alt="UK Parliament" />
      </div>

      <div className="introText">
        <h3>The United States Congress, often referred to as the backbone of American democracy, is a prominent legislative body that plays a vital role in shaping the nation's laws, policies, and future. Comprising the House of Representatives and the Senate, the Congress functions as the cornerstone of the American political system, representing the interests and voices of its diverse population. It's where passionate debates, impactful decisions, and historic changes come to life. Dive into the world of the US Congress and explore its dynamic nature, influential members, and significant role in the governance of the United States.</h3>
        <h3>The UK Parliament, a symbol of British governance and tradition, is an institution with a rich history that dates back centuries. Nestled in the heart of London, it is the epicenter of British politics and legislation. Consisting of the House of Commons and the House of Lords, the UK Parliament shapes the laws and policies that govern the United Kingdom. Explore the unique parliamentary system, the iconic Big Ben clock tower, and the hallowed halls where debates on the nation's future unfold. The UK Parliament is a testament to the enduring traditions and modern democracy of the United Kingdom.</h3>
      </div>
      
      <div className="linkText">
        <Link to="/congress">Find more information regarding the US Congress through the Congress API here.</Link>
        <Link to="/parliament">Find more information regarding the UK Parliament through the Parliament API here.</Link>
      </div>

    </div>
  );
  //the linktext both of them are jsx components <link>, the to specifies the url and the text is just clickable. They basically creating links that navigates to their specific route when clicked
}

export default Homepage;