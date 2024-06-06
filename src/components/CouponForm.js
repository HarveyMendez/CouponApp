import React from 'react';

const CouponForm = ({ cupon, index, updateCupon, removeCupon }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCupon(index, { ...cupon, [name]: value });
  };

  return (
    <div>
      <input
        type="text"
        name="titulo"
        value={cupon.titulo}
        onChange={handleChange}
        placeholder="Título del cupón"
        required
      />
      <textarea
        name="descripcion"
        value={cupon.descripcion}
        onChange={handleChange}
        placeholder="Descripción del cupón"
        required
      />
      <input
        type="number"
        name="descuento"
        value={cupon.descuento}
        onChange={handleChange}
        placeholder="Descuento (%)"
        required
      />
      <input
        type="date"
        name="fechaVencimiento"
        value={cupon.fechaVencimiento}
        onChange={handleChange}
        required
      />
      <button onClick={() => removeCupon(index)}>Eliminar</button>
    </div>
  );
};

export default CouponForm;