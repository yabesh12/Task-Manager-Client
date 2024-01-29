import React from 'react';

const HeroSection = () => {
  const heroStyle = {
    position: 'relative',
    backgroundImage: 'url("/bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'scroll', // or 'scroll' depending on your preference
    height: '100vh', // Adjust the height as needed
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)', // Optional text shadow for better visibility
    fontFamily: 'Roboto, sans-serif', // Apply the Roboto font
  };

  const overlayStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', 
  };

  return (
    <div style={heroStyle}>
      <div style={overlayStyle}></div>
      <h1 className='text-light'>Welcome to TaskManager</h1>
    </div>
  );
};

export default HeroSection;
