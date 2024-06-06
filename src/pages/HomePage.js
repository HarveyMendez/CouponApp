import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Modal = ({ isOpen, onClose, user, fetchCupones}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data['nombre_usuario'] = user;
    data['id']= '5';
 

    try {
      const response = await fetch('https://couponapi2.azurewebsites.net/index.php/newCoupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error al agregar el cupón');
      }

      fetchCupones();

    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Formulario para Añadir Cupón</h2>
        <button onClick={onClose} className="modal-close-button">Cerrar</button>
        
        <form id="cuponForm" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required/><br/>

          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input type="datetime-local" id="fechaInicio" name="fechaInicio" required/><br/>

          <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
          <input type="datetime-local" id="fechaVencimiento" name="fechaVencimiento" required/><br/>

          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" name="precio" step="0.01" required/><br/>

          <label htmlFor="estado">Estado:</label>
          <select id="estado" name="estado">
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select><br/>

          <label htmlFor="categoria">Categoría:</label>
          <input type="text" id="categoria" name="categoria" required/><br/>

          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" required/><br/>

          <button type="submit">Añadir Cupón</button>
        </form>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [cupones, setCupones] = useState([]);

  const { logout } = useAuth();

  const { user } = useAuth();


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVerActualizarCupon = (cuponId) => {
    // Aquí puedes agregar la lógica para ver y actualizar la información del cupón
    console.log('Ver/Actualizar cupón con ID:', cuponId);
  };

  const fetchCupones = async () => {
    try {
      const response = await fetch(`https://couponapi2.azurewebsites.net/index.php/getCoupon?usuarioEmpresa=${user}`);
      const data = await response.json();
      setCupones(data);
    } catch (error) {
      console.error('Error al obtener los cupones:', error);
    }
  };

  useEffect(() => {
    fetchCupones();
  }, [user] [fetchCupones]);

  return (
    <div>
      <h1>Listado de Cupones</h1>
      <button onClick={openModal}>Agregar Nuevo Cupón</button>
      {/* Aquí colocarías tu tabla de cupones */}
      <Modal isOpen={isModalOpen} onClose={closeModal} user={user} fetchCupones={fetchCupones}/>
      <table>
        <thead>
          <tr>
            <th>Nombre del Cupón</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cupones.map(cupon => (
            <tr key={cupon.id}>
              <td>{cupon.nombre}</td>
              
              <td>{cupon.estado ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button onClick={() => handleVerActualizarCupon(cupon.id)}>Ver/Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/profile">Ir al Perfil de la Empresa</Link>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default HomePage;