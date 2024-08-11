import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import UserSongs from '../components/app/UserSongs';
import placeholderImage from '/images/PlaceHolder.png';

const MyProfilePage = () => {
  const { data, loading, error, callApi } = useAxios('/users/profiles/profile_data', 'GET', null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    callApi();
  }, [callApi]);

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;
  if (!profile) return <p>No se encontraron datos del perfil.</p>;

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Columna Izquierda - Perfil */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg lg:col-span-1">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">Mi Perfil</h1>
          
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <img
                src={profile.image || placeholderImage}
                alt="Imagen de perfil"
                className="w-full h-full rounded-full border-8 border-gray-900 object-cover"
              />
              <div className="absolute inset-0 rounded-full border-4 border-green-500"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
              <p className="text-lg font-semibold text-green-400">Username:</p>
              <p className="text-white">{profile.username}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
              <p className="text-lg font-semibold text-green-400">Nombre:</p>
              <p className="text-white">{profile.first_name} {profile.last_name}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
              <p className="text-lg font-semibold text-green-400">Email:</p>
              <p className="text-white">{profile.email}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
              <p className="text-lg font-semibold text-green-400">Fecha de nacimiento:</p>
              <p className="text-white">{profile.dob ? new Date(profile.dob).toLocaleDateString() : 'No disponible'}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
              <p className="text-lg font-semibold text-green-400">Biografía:</p>
              <p className="text-white">{profile.bio || 'No disponible'}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
              <p className="text-lg font-semibold text-green-400">Fecha de alta:</p>
              <p className="text-white">{profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'No disponible'}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
              <p className="text-lg font-semibold text-green-400">Fecha de modificación:</p>
              <p className="text-white">{profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'No disponible'}</p>
            </div>
          </div>
        </div>
        
        {/* Columna Derecha - Mis Canciones Publicadas y Mi Playlist */}
        <div className="flex flex-col space-y-6 lg:col-span-1">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg flex-1">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">Mis Canciones Publicadas</h1>
            <UserSongs userId={profile.user__id} />
          </div>

          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg flex-1">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">Mi Playlist</h1>
            {/* Este espacio es un placeholder, solo para llenar el espacio */}
            <div className="bg-gray-700 h-20 rounded-lg"></div>
            <div className="bg-gray-700 h-20 rounded-lg mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;

