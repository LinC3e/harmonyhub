import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

const CreateSongModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [duration, setDuration] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [songFileName, setSongFileName] = useState('');

  const navigate = useNavigate();
  const { data, loading, error, callApi } = useAxios('/harmonyhub/songs/', 'POST');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSongFile(file);
    if (file) {
      setSongFileName(file.name);
    } else {
      setSongFileName('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('duration', duration);
    if (songFile) {
      formData.append('song_file', songFile);
    }

    await callApi(formData, true);
  };

  useEffect(() => {
    if (data && data.id) {
      setIsOpen(false);
      navigate(`/songs/${data.id}`);
    }
  }, [data, navigate]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary hover:bg-green-700 text-white rounded font-semibold"
      >
        Subir Canción
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Canción</h2>
            {error && (
              <p className="mb-4 text-red-500 bg-red-100 p-2 rounded">{error}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Año de Lanzamiento</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Duración (segundos)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Archivo de Canción</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
                {songFileName && (
                  <p className="mt-2 text-sm text-gray-500">Archivo seleccionado: {songFileName}</p>
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
                  {loading ? 'Creando...' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSongModal;