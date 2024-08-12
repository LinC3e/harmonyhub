const HomePages = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/videos/Ecu.mov" type="video/mp4" />
        <p className="text-white">Tu navegador no soporta el elemento de video. Por favor, utiliza un navegador moderno para ver el contenido.</p>
      </video>
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black bg-opacity-60">
        <h1 className="text-5xl font-extrabold mb-6 mt-8" style={{ 
          color: '#1DB954',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
        }}>
          Bienvenido a HarmonyHub
        </h1>
        <p className="text-xl font-semibold rounded-lg p-3" style={{ 
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)',
        }}>
          ¡Explora nuestra app y disfruta de la mejor música!
        </p>
      </div>
    </div>
  );
};

export default HomePages;
