1. Resumen del Proyecto

    Nombre del Proyecto: HarmonyHub
    Descripción General: HarmonyHub es una aplicación de música que permite a los usuarios escuchar canciones, ver detalles de álbumes y artistas, y disfrutar de una experiencia musical interactiva.
    Objetivos: Crear una interfaz amigable para el usuario que permita la reproducción continua de música, integración con API de música, y proporcionar una experiencia consistente en todas las páginas de la aplicación.

2. Arquitectura del Proyecto

    Frontend: React con Tailwind CSS para el diseño responsivo y Vite como herramienta de construcción.
    Backend: Conectado a API https://sandbox.academiadevelopers.com/docs/
    Estado Global: Manejado mediante Context API (SongContext.jsx) para compartir el estado de la canción actual y la reproducción global en toda la aplicación.
    Routing: React Router para la navegación entre páginas como SongsPage, AlbumPage, y ArtistDetailPage.

3. Estructura del Código

```
src/componets/
              app/   - para componente reutilizables
              layouts/  - para componentes que comparten todas las paginas
    
    /context/  - para los contextos

    /hooks/    - hooks personalizados
    
    /pages/    - todas las paginas accesibles

    /routes/   - enrutamiento y proteccion de rutas
            
```

4. Decisiones de Diseño

    Uso de Context API: Se eligió Context API para manejar el estado global de la canción actual, permitiendo que el reproductor global tenga acceso a la canción y su estado de reproducción desde cualquier parte de la aplicación.
    Estilo con Bulma y Tailwind CSS: Tailwind CSS fue elegido por su capacidad para crear un diseño responsivo rápidamente, con un sistema de utilidades que permite aplicar clases CSS directamente en el JSX.
    Vite como Herramienta de Construcción: Vite se eligió por su rapidez en el desarrollo local y su capacidad de manejar proyectos modernos de React con configuración mínima.
    Reproductor Global: Decisión de implementar un reproductor global que permanezca activo mientras el usuario navega por la aplicación para mejorar la experiencia del usuario.

5. Consideraciones de Futuro

    Optimización de Carga: Considerar la optimización de carga de componentes y datos para mejorar la velocidad de la aplicación.
    Soporte para Listas de Reproducción: Agregar funcionalidad para crear y gestionar listas de reproducción personalizadas.

6. Conclusión

    HarmonyHub ha sido diseñado para ofrecer una experiencia de usuario fluida y continua. Las decisiones de arquitectura y diseño han sido tomadas para facilitar la escalabilidad y mantener un estilo coherente en toda la aplicación.