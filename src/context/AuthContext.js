import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (nombre_usuario, contrasenna) => {
    try {
      const response = await fetch('https://couponapi2.azurewebsites.net/index.php/businessLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: nombre_usuario, password: contrasenna }), // Asegúrate de que los nombres sean correctos
      });
  
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
  
      const data = await response.json();
  
      if (!data.nombre_usuario) {
        alert("Usuario no existe");
      } else if (data.nombre_usuario === nombre_usuario) {
        if (data.contrasena === contrasenna) {
            alert("Inicio de Sesion Exitoso");
            setUser(data.nombre_usuario);
            setIsAuthenticated(true);
        } else {
            alert("Contraseña incorrecta");
        }
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};