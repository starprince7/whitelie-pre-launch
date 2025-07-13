'use client';

import React from 'react';

interface ConceptIntroEmailProps {
  user: {
    email: string;
    firstName?: string;
  };
}

const ConceptIntroEmail: React.FC<ConceptIntroEmailProps> = ({ user }) => {
  const containerStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
    backgroundColor: '#f4f4f4',
    margin: '0 auto',
    padding: '20px',
  };

  const wrapperStyle: React.CSSProperties = {
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '8px',
  }

  const headerStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '10px',
    borderBottom: '3px solid #FDCA64',
    paddingBottom: '15px'
  };

  const sectionTitleStyle: React.CSSProperties = {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#000000',
      marginTop: '30px',
      marginBottom: '15px',
  }

  const pStyle: React.CSSProperties = {
      marginBottom: '15px',
      color: '#555'
  }

  const listStyle: React.CSSProperties = {
      listStyleType: 'none',
      paddingLeft: '0',
      marginBottom: '15px',
  }

  const listItemStyle: React.CSSProperties = {
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center'
  }

  const checkmarkStyle: React.CSSProperties = {
      color: '#FDCA64',
      marginRight: '10px',
      fontWeight: 'bold',
      fontSize: '20px'
  }

  const ctaButtonStyle: React.CSSProperties = {
      display: 'inline-block',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '12px 25px',
      borderRadius: '5px',
      textDecoration: 'none',
      fontWeight: 'bold',
      marginTop: '20px'
  }

  const footerStyle: React.CSSProperties = {
      marginTop: '30px',
      fontSize: '12px',
      color: '#999',
      textAlign: 'center'
  }

  return (
    <div style={containerStyle}>
        <div style={wrapperStyle}>
            <h1 style={headerStyle}>Introducing WhiteLie</h1>
            <p style={{...pStyle, fontStyle: 'italic', color: '#777'}}>Professional event companions for business and social occasions.</p>

            <h2 style={sectionTitleStyle}>Professional Events Require Professional Presence</h2>
            <p style={pStyle}>Corporate functions, business networking events, and social obligations demand a certain level of professional representation. WhiteLie is a platform for those who need a qualified companion and for professionals who can provide these services.</p>

            <h2 style={sectionTitleStyle}>Two Professional Service Options</h2>
            
            <h3 style={{...sectionTitleStyle, fontSize: '18px', marginTop: '20px' }}>For Clients:</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}><span style={checkmarkStyle}>✔</span> Hire verified professional companions for business events.</li>
                <li style={listItemStyle}><span style={checkmarkStyle}>✔</span> Thoroughly screened and business-references checked providers.</li>
                <li style={listItemStyle}><span style={checkmarkStyle}>✔</span> Clear service agreements and professional boundaries.</li>
                <li style={listItemStyle}><span style={checkmarkStyle}>✔</span> Flexible booking with transparent pricing.</li>
            </ul>

            <h3 style={{...sectionTitleStyle, fontSize: '18px', marginTop: '20px' }}>For Service Providers:</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}><span style={checkmarkStyle}>✔</span> Monetize your professional presence - earn ₦2,000-₦10,000+ per engagement.</li>
                <li style={listItemStyle}><span style={checkmarkStyle}>✔</span> Flexible scheduling around your availability.</li>
                <li style={listItemStyle}><span style={checkmarkStyle}>✔</span> Professional networking and business development opportunities.</li>
                <li style={listItemStyle}><span style={checkmarkStyle}>✔</span> Build a verified reputation and expand your service offerings.</li>
            </ul>

            <h2 style={sectionTitleStyle}>Professional Standards, Always</h2>
            <p style={pStyle}>We prioritize safety and professionalism with comprehensive verification, background screening, business reference checks, and clear service agreements.</p>

            <div style={{textAlign: 'center'}}>
                <a href="https://whitelie.com/landing#waitlist" target="_blank" style={ctaButtonStyle}>Register for Professional Access</a>
            </div>
        </div>
        <div style={footerStyle}>
            <p>You are receiving this email as a participant in our initial market research survey.</p>
            <p>&copy; {new Date().getFullYear()} WhiteLie. All rights reserved.</p>
            <p><a href="https://whitelie.com/unsubscribe" target="_blank" style={{color: '#999'}}>Unsubscribe</a></p>
        </div>
    </div>
  );
};

export default ConceptIntroEmail;
