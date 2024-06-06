import React, { useState } from 'react';
import CouponForm from '../components/CouponForm';
import ProfileForm from '../components/ProfileForm';

const CompanyProfilePage = () => {
  const [cupones, setCupones] = useState([]);
  const [empresaData, setEmpresaData] = useState({
    nombre: '',
    direccion: '',
    cedula: '',
    fechaCreacion: '',
    email: '',
    telefono: '',
    password: ''
  });

  const addCupon = (nuevoCupon) => {
    setCupones([...cupones, nuevoCupon]);
  };

  const updateCupon = (index, updatedCupon) => {
    const newCupones = [...cupones];
    newCupones[index] = updatedCupon;
    setCupones(newCupones);
  };

  const removeCupon = (index) => {
    const newCupones = cupones.filter((_, i) => i !== index);
    setCupones(newCupones);
  };

  return (
    <div>
      <h1>Perfil de la Empresa</h1>
      <ProfileForm empresaData={empresaData} setEmpresaData={setEmpresaData} />
      <h2>Gestión de Cupones</h2>
      {cupones.map((cupon, index) => (
        <CouponForm
          key={index}
          cupon={cupon}
          index={index}
          updateCupon={updateCupon}
          removeCupon={removeCupon}
        />
      ))}
      <button onClick={() => addCupon({ titulo: '', descripcion: '', descuento: '', fechaVencimiento: '' })}>
        Agregar Cupón
      </button>
    </div>
  );
};

export default CompanyProfilePage;