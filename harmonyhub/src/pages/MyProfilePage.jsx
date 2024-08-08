import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import placeholderImage from '../../public/images/PlaceHolder.png';

const MyProfilePage = () => {
  const { data, loading, error, callApi } = useAxios('users/profiles/profile_data', 'GET', null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    callApi();
  }, [callApi]);

  // Actualiza el estado con los datos del perfil cuando se reciben
  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;
  if (!profile) return <p>No se encontraron datos del perfil.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Mi Perfil</h1>
        
        {/* Círculo de Imagen de Perfil */}
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <img
              src={profile.image || placeholderImage} // Usa el placeholder si no hay imagen de perfil
              alt="Imagen de perfil"
              className="w-full h-full rounded-full border-8 border-gray-900 object-cover"
            />
            <div className="absolute inset-0 rounded-full border-4 border-green-500"></div>
          </div>
        </div>

        {/* Recuadros de datos dentro del recuadro general */}
        <div className="space-y-2">
          <div className="bg-gray-900 p-2 rounded-lg w-full">
            <p className="text-lg font-semibold text-green-400">Username:</p>
            <p className="text-white">{profile.username}</p>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg w-full">
            <p className="text-lg font-semibold text-green-400">Nombre:</p>
            <p className="text-white">{profile.first_name} {profile.last_name}</p>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg w-full">
            <p className="text-lg font-semibold text-green-400">Email:</p>
            <p className="text-white">{profile.email}</p>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg w-full">
            <p className="text-lg font-semibold text-green-400">Fecha de nacimiento:</p>
            <p className="text-white">{profile.dob ? new Date(profile.dob).toLocaleDateString() : 'No disponible'}</p>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg w-full">
            <p className="text-lg font-semibold text-green-400">Biografía:</p>
            <p className="text-white">{profile.bio || 'No disponible'}</p>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg w-full">
            <p className="text-lg font-semibold text-green-400">Fecha de alta:</p>
            <p className="text-white">{profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'No disponible'}</p>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg w-full">
            <p className="text-lg font-semibold text-green-400">Fecha de modificación:</p>
            <p className="text-white">{profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'No disponible'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MyProfilePage;