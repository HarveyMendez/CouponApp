import React, { createContext, useState, useContext } from 'react';


const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};


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
        body: JSON.stringify({ username: nombre_usuario, password: contrasenna }),
      });
  
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
  
      const data = await response.json();
  
      if (!data.nombre_usuario) {
        alert("Usuario no existe");
        setIsAuthenticated(false);
      } else if (data.nombre_usuario === nombre_usuario) {
        if (data.contrasena === contrasenna && data.token === 0) {
            
            setUser(data.nombre_usuario);
            setIsAuthenticated(true);
            return { success: true };

        } else if(data.contrasena === contrasenna && data.token === 1){
            
            setUser(data.nombre_usuario);
            //setIsAuthenticated(true);
            return { changePass: true };
        } 
        else {
            
            setIsAuthenticated(false);
            return { success: false, message: data.message || 'Contraseña incorrecta' };
        }
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setIsAuthenticated(false);
      return { success: false};
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};