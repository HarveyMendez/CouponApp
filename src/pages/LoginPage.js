import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password)
      .then(data => {
        if (data.success === false) {
          alert("Contraseña incorrecta");
        } else if (data.changePass === true) {
          alert("Primer Inicio de Sesion Detectado");
          navigate('/changePassword')
        } else if (data.success === true) {
          alert("Inicio de Sesion Exitoso");
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error('Error inesperado:', error);
      });
      
    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;