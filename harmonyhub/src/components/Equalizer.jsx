import React from 'react';
import './Equalizer.css';

const Equalizer = () => {
  return (
    <div className="container">
      <div className="welcome-text">
        Bienvenido a HarmonyHub
      </div>
      <div className="equalizer">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="description">
        Explora nuestra colección de música y disfruta de las mejores canciones y álbumes.
      </div>
    </div>
  );
}

export default Equalizer;
