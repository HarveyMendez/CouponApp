import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {

    const { setIsAuthenticated } = useAuth();

    const {user} = useAuth();

    const [newPassword, setNewPassword] = useState('');

    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }
    
        const passwordChanged = await fetchNewPassword();
    
        if (passwordChanged) {
          alert("Contraseña actualizada correctamente");
          setIsAuthenticated(true);
          navigate('/dashboard');
        } else {
          alert("Error al actualizar la contraseña");
        }
      };
    
      const fetchNewPassword = async () => {
        try {
          const response = await fetch('https://couponapi2.azurewebsites.net/index.php/changePassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password: newPassword }),
          });
    
          if (!response.ok) {
            throw new Error('Error al enviar el cambio de contraseña');
          }
    
          const data = await response.json();
    
          return data.message ? true : false;
        } catch (error) {
          alert("Error: " + error);
          return false;
        }
      };

  return (
    <div>
      <h1>Cambiar Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva Contraseña"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />

        <button type="submit">Cambiar Contraseña</button>
      </form>
      
    </div>
  );
};

export default ChangePasswordPage;