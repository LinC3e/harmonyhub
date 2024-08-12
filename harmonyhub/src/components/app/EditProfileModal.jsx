import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

// eslint-disable-next-line react/prop-types
const EditProfileModal = ({ profileId, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  
  const { data: profileData, error: profileError, callApi: getProfile } = useAxios(`/users/profiles/${profileId}`, 'GET', []);
  const { loading, error, callApi } = useAxios(`/users/profiles/${profileId}`, 'PATCH', []);

  useEffect(() => {
    if (isOpen) {
      getProfile();
    }
  }, [isOpen, getProfile]);

  useEffect(() => {
    if (profileData) {
      setUsername(profileData.username || '');
      setFirstName(profileData.first_name || '');
      setLastName(profileData.last_name || '');
      setEmail(profileData.email || '');
      setDob(profileData.dob || '');
      setBio(profileData.bio || '');
      setImageFileName(profileData.image ? profileData.image.split('/').pop() : '');
    }
  }, [profileData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageFileName(file ? file.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', firstname);
    formData.append('last_name', lastname);
    formData.append('email', email);
    formData.append('dob', dob);
    formData.append('bio', bio);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await callApi(formData, true);
      setIsOpen(false)
      if (onSuccess) onSuccess(); 
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-2 bg-orange-600 hover:bg-orange-900 text-white rounded font-semibold"
      >
        Editar Perfil
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Perfil</h2>
            {profileError && (
              <p className="mb-4 text-red-500 bg-red-100 p-2 rounded">{profileError.message || 'Error al cargar el perfil.'}</p>
            )}
            {error && (
              <p className="mb-4 text-red-500 bg-red-100 p-2 rounded">{error.message || 'Error al actualizar el perfil.'}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Biografía</label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Imagen de perfil</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
                {imageFileName && (
                  <p className="mt-2 text-sm text-gray-500">Archivo seleccionado: {imageFileName}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={`mr-2 px-4 py-2 bg-red-300 hover:bg-red-500 rounded ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Actualizando...' : 'Actualizar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;