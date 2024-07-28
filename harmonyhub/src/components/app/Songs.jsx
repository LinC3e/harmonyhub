import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const Songs = () => {
  const { data, loading, error, callApi } = useAxios('/songs', 'GET', [])
  
  useEffect(() => {
    callApi();
  }, [callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ul>
        {data && data.length > 0 ? (
          data.map(cancion => (
            <li key={cancion.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold">{cancion.title}</h2>
            </li>
          ))
        ) : (
          <p>No se encontraron canciones.</p>
        )}
      </ul>
    </div>
  )
}

export default Songs;