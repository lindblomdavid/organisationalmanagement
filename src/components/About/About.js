import React, { useState } from 'react';
import './About.css';
import aboutImage from '../../images/about-image.png';
import aboutData from './About.json';
import aboutDataSwe from './About-swe.json';

const About = () => {
  const renderContent = () => {
    const data = language === 'swe' ? aboutDataSwe : aboutData;

    return Object.values(data).map((section) => (
      <>
        <h2>{section.heading}</h2>
        <p>{section.description}</p>
      </>
    ));
  };
  const [language, setLanguage] = useState('swe');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'swe' ? 'eng' : 'swe'));
  };

  return (
    <>
      <div className="about-wrapper">
        <div className="language-switcher">
          <button onClick={toggleLanguage}>
            {language === 'swe' ? 'English' : 'Svenska'}
          </button>
        </div>
        <div className="about">
          <div className="about-content">{renderContent()}</div>
          <div className="about-image-container">
            <img src={aboutImage} alt="About" className="about-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;