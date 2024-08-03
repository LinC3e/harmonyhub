import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';

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
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Mi Perfil</h1>
      <div className="border p-4 rounded-lg shadow-md">
        {profile.image && <img src={profile.image} alt="Imagen de perfil" className="w-32 h-32 rounded-full mb-4" />}
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Nombre:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Fecha de nacimiento:</strong> {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'No disponible'}</p>
        <p><strong>Biografía:</strong> {profile.bio || 'No disponible'}</p>
        <p><strong>Fecha de alta:</strong> {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'No disponible'}</p>
        <p><strong>Fecha de modificación:</strong> {profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'No disponible'}</p>
      </div>
    </div>
  );
};

export default MyProfilePage;