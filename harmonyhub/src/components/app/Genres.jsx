import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const Genres = () => {
  const { data, loading, error, callApi } = useAxios('/harmonyhub/genres?ordering=-created_at', 'GET', [])
  
  useEffect(() => {
    callApi();
  }, [callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const genres = data.results || [];
  return (
    <div>
      <ul>
        {genres && genres.length > 0 ? (
          genres.map(genero => (
            <li key={genero.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold">{genero.name}</h2>
              <p>{genero.description}</p>
            </li>
          ))
        ) : (
          <p>No se encontraron generos musicales.</p>
        )}
      </ul>
    </div>
  )
}

export default Genres;