import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { FaTrash } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const DeleteSongModal = ({ songId, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, error, callApi } = useAxios(`/harmonyhub/songs/${songId}`, 'DELETE');

  const handleDelete = async () => {
    await callApi();
    if (!error) {
      onDelete();
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
      >
        <FaTrash />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex text-black items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Eliminar Canción</h2>
            <p className="mb-4">¿Estás seguro de que quieres eliminar esta canción?</p>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="mr-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className={`px-4 py-2 bg-red-500 text-white rounded flex hover:bg-red-800 items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <FaTrash className="mr-2" />
                {loading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteSongModal;