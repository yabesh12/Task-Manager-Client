import React from 'react';

const HeroSection = () => {
  const heroStyle = {
    backgroundImage: 'url("/task-manager-bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'scroll', // or 'scroll' depending on your preference
    height: '100vh', // Adjust the height as needed
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Optional text shadow for better visibility
    fontFamily: 'Roboto, sans-serif', // Apply the Roboto font
  };

  return (
    <div style={heroStyle}>
      <h1 className='text-dark'>Welcome to TaskManager</h1>
      {/* Add any other content for the hero section */}
    </div>
  );
};

export default HeroSection;
