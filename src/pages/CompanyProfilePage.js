import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import { useAuth } from '../context/AuthContext';

const CompanyProfilePage = () => {
  const { user } = useAuth();
  const [empresaData, setEmpresaData] = useState({
    nombre_empresa: '',
    direccion_fisica: '',
    cedula: '',
    fecha_creacion: '',
    correo_electronico: '',
    telefono: '',
    contrasena: '',
    ubicacion: '',
    estado: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchBusiness = async () => {
    try {
      const response = await fetch(`https://couponapi2.azurewebsites.net/index.php/getBusiness?usuarioEmpresa=${user}`);
      const data = await response.json();
      if (data.length > 0) {
        setEmpresaData(data[0]);
      }
      setLoading(false); 
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  return (
    <div>
      <h1>Perfil de la Empresa</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ProfileForm empresaData={empresaData} setEmpresaData={setEmpresaData} user={user} />
          <button><Link to="/dashboard">Ir a gestion de cupones</Link></button>
          
        </>
      )}
    </div>
  );
};

export default CompanyProfilePage;