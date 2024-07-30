import React from 'react';

const HomePages = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-primary mb-8" style={{ background: '-webkit-linear-gradient(#ddd, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Bienvenido a HarmonyHub
      </h1>
      <div className="w-full flex justify-center">
        <img src="/path-to-your-gif/animation.gif" alt="GIF animado aqui" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default HomePages;