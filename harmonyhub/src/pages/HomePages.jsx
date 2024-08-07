const HomePages = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold mb-4 mt-8" style={{ 
        color: '#1DB954', // Usa el mismo color verde que los enlaces
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' // Sombra de texto sutil para resaltar
      }}>
        Bienvenido a HarmonyHub
      </h1>
      <div className="w-full max-w-4xl mb-4">
        <video width="100%" autoPlay loop muted>
          <source src="/videos/Ecu.mov" type="video/mp4" />
          <p>Tu navegador no soporta el elemento de video. Por favor, utiliza un navegador moderno para ver el contenido.</p>
        </video>
      </div>
      <p className="mb-8" style={{ 
        color: '#1ED760', // Verde más brillante
        fontWeight: 'bold',
        fontSize: '1.2rem',
        textShadow: '1px 1px 3px rgba(255, 255, 255, 0.5)' // Sombra blanca para más contraste
      }}>
        ¡Explora nuestra app y disfruta de la mejor musica!
      </p>
    </div>
  );
};

export default HomePages;
