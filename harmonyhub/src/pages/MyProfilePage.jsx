import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import UserSongs from '../components/app/UserSongs'
import placeholderImage from '/images/PlaceHolder.png';

const MyProfilePage = () => {
  const { data, loading, error, callApi } = useAxios('/users/profiles/profile_data', 'GET', null);
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
  console.log(profile.user__id)

  return (
    <div className="flex flex-col lg:flex-row items-start min-h-screen bg-gray-900 py-8 px-2 lg:px-4">
      <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-lg w-full lg:w-1/2 lg:mr-8">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Mi Perfil</h1>
        
        {/* Círculo de Imagen de Perfil */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <img
              src={profile.image || placeholderImage} // Usa el placeholder si no hay imagen de perfil
              alt="Imagen de perfil"
              className="w-full h-full rounded-full border-8 border-gray-900 object-cover"
            />
            <div className="absolute inset-0 rounded-full border-4 border-green-500"></div>
          </div>
        </div>

        {/* Recuadros de datos dentro del recuadro general */}
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-green-400">Username:</p>
            <p className="text-white text-lg">{profile.username}</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-green-400">Nombre:</p>
            <p className="text-white text-lg">{profile.first_name} {profile.last_name}</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-green-400">Email:</p>
            <p className="text-white text-lg">{profile.email}</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-green-400">Fecha de nacimiento:</p>
            <p className="text-white text-lg">{profile.dob ? new Date(profile.dob).toLocaleDateString() : 'No disponible'}</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-green-400">Biografía:</p>
            <p className="text-white text-lg">{profile.bio || 'No disponible'}</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-green-400">Fecha de alta:</p>
            <p className="text-white text-lg">{profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'No disponible'}</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-green-400">Fecha de modificación:</p>
            <p className="text-white text-lg">{profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'No disponible'}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 lg:mt-0 lg:w-1/2">
        <UserSongs userId={profile.user__id} />
      </div>
    </div>
  );
};


export default MyProfilePage;