import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import useAxios from "../hooks/useAxios";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { data, error, callApi } = useAxios('/api-auth/', 'POST', []);
  const { login } = useAuth("actions");
  const { isAuthenticated } = useAuth("state");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await callApi({ username, password });
  };
  if (!error && data && data.token) {
    console.log(data);
    login(data.token);
    console.log(data.token);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-secondary text-textPrimary p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-accent transition-colors"
            >Iniciar sesión
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center">
              {Array.isArray(error.non_field_errors) ? (
                <ul className="list-disc list-inside">
                  {error.non_field_errors.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              ) : (
                <p>{error.message || error.error}</p>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;