import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';

const CompanyProfilePage = () => {
  
  const [empresaData, setEmpresaData] = useState({
    nombre: '',
    direccion: '',
    cedula: '',
    fechaCreacion: '',
    email: '',
    telefono: '',
    password: ''
  });


  return (
    <div>
      <h1>Perfil de la Empresa</h1>
      <ProfileForm empresaData={empresaData} setEmpresaData={setEmpresaData} />
      <Link to="/dashboard">Ir a gestion de cupones</Link>
    </div>
  );
};

export default CompanyProfilePage;