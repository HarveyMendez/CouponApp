import React, { useState, useEffect } from 'react';

const ProfileForm = ({ empresaData, setEmpresaData, user }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresaData({ ...empresaData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBusiness();
    
  };

  const fetchBusiness = async () => {

    const data = empresaData;
    data['nombre_usuario'] = user;

    try {
      const response = await fetch('https://couponapi2.azurewebsites.net/index.php/updateBusiness', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        console.log("error");
      }

      const result = await response.json();
      alert('Informacion actualizada exitosamente');

    } catch (error) {
      
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      {empresaData && (
        <>
          <label>Nombre Empresa</label>
          <input
            type="text"
            name="nombre_empresa"
            value={empresaData.nombre_empresa}
            onChange={handleChange}
            placeholder="Nombre de la empresa"
            
          />
          <label>Dirección fisíca</label>
          <input
            type="text"
            name="direccion_fisica"
            value={empresaData.direccion_fisica}
            onChange={handleChange}
            placeholder="Dirección física"
            
          />
          <label>Cedula</label>
          <input
            type="text"
            name="cedula"
            value={empresaData.cedula}
            onChange={handleChange}
            placeholder="Cédula física o jurídica"
            
          />
          <label>Correo electrónico</label>
          <input
            type="email"
            name="correo_electronico"
            value={empresaData.correo_electronico}
            onChange={handleChange}
            placeholder="Correo electrónico"
            
          />
          <label>Telefono</label>
          <input
            type="number"
            name="telefono"
            value={empresaData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            
          />
          {/* 
          <input
            type="password"
            name="password"
            value={empresa.contrasena}
            onChange={handleChange}
            placeholder="Contraseña"
            
          />
          */}
          <label>Ubicacíon</label>
          <input
            type="text"
            name="ubicacion"
            value={empresaData.ubicacion}
            onChange={handleChange}
            placeholder="Ubicación"
            
          />
          <button type="submit">Guardar</button>
        </>
      )}
    </form>
  );
};

export default ProfileForm;