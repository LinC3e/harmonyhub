import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/authContext";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { data, error, callApi } = useAxios('/api-auth/', 'POST', []);

  const { login } = useAuth("actions");
  const { isAuthenticated} = useAuth("state")
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
    console.log(data)
    login(data.token);
    console.log(data.token)
  }

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="email">Username</label>
      <input
        type="username" id="username" name="username" placeholder="Nombre de usuario" required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="password">Contraseña*</label>
      <div>
        <input
          type="password" id="password" name="password" placeholder="Contraseña" required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>

    <div className="mb-4">
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >Iniciar sesion
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
    )
  }
  
  export default LoginPage