import React from 'react';

const ProfileForm = ({ empresaData, setEmpresaData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresaData({ ...empresaData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos al servidor
    console.log('Datos de la empresa enviados:', empresaData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={empresaData.nombre}
        onChange={handleChange}
        placeholder="Nombre de la empresa"
        required
      />
      <input
        type="text"
        name="direccion"
        value={empresaData.direccion}
        onChange={handleChange}
        placeholder="Dirección física"
        required
      />
      <input
        type="text"
        name="cedula"
        value={empresaData.cedula}
        onChange={handleChange}
        placeholder="Cédula física o jurídica"
        required
      />
      <input
        type="text"
        name="fechaCreacion"
        value={empresaData.fechaCreacion}
        onChange={handleChange}
        placeholder="Fecha de creación"
        required
      />
      <input
        type="email"
        name="email"
        value={empresaData.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        required
      />
      <input
        type="tel"
        name="telefono"
        value={empresaData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        required
      />
      <input
        type="password"
        name="password"
        value={empresaData.password}
        onChange={handleChange}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProfileForm;