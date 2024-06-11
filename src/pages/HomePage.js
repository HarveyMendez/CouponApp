import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Modal = ({ isOpen, onClose, user, categorias}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data['nombre_usuario'] = user;
 

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
            
          <select id="categoria" name="categoria">
        {/* Usando map para crear opciones */}
        {categorias.map(categoria => (
          <option key={categoria.id} value={categoria.id}>{categoria.nombreCategoria}</option>
        ))}
      </select>

          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" required/><br/>

          <button type="submit">Añadir Cupón</button>
        </form>
      </div>
    </div>
  );
};

const Modal2 = ({ isOpen, onClose, cupon, categorias}) => {
  const [formData, setFormData] = useState({
    nombre: cupon.nombre,
    fechaInicio: cupon.fecha_inicio,
    fechaVencimiento: cupon.fecha_vencimiento,
    precio: cupon.precio,
    estado: cupon.estado,
    categoria: cupon.categoria,
    cantidad: cupon.cantidad
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Esta función se ejecutará cada vez que cambie el valor de 'cupon'
  useEffect(() => {
    // Actualizamos el estado local con los nuevos valores del cupón
    setFormData({
      nombre: cupon.nombre,
      fechaInicio: cupon.fecha_inicio,
      fechaVencimiento: cupon.fecha_vencimiento,
      precio: cupon.precio,
      estado: cupon.estado,
      categoria: cupon.categoria,
      cantidad: cupon.cantidad
    });
  }, [cupon]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Actualizar información del {cupon.nombre}</h2>
        <button onClick={onClose} className="modal-close-button">Cerrar</button>
        
        <form id="cuponForm" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required/><br/>

          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input type="datetime-local" id="fechaInicio" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required/><br/>

          <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
          <input type="datetime-local" id="fechaVencimiento" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} required/><br/>

          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} step="0.01" required/><br/>

          <label htmlFor="estado">Estado:</label>
          <select id="estado" name="estado" value={formData.estado} onChange={handleChange}>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select><br/>

          <label htmlFor="categoria">Categoría:</label>
          <select id="categoria" name="categoria" value={formData.categoria} onChange={handleChange}>
            {/* Usando map para crear opciones */}
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>{categoria.nombreCategoria}</option>
            ))}
          </select><br/>

          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} required/><br/>

          <button type="submit">Actualizar Cupón</button>
        </form>
      </div>
    </div>
  );
};



const HomePage = () => {
  const [cupones, setCupones] = useState([]);

  const { logout } = useAuth();

  const { user } = useAuth();

  const [cuponSeleccionado, setCuponSeleccionado] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const handleVerActualizarCupon = (cuponId) => {
    // Encuentra el cupón seleccionado por su ID
    const cupon = cupones.find(cupon => cupon.id === cuponId);
    // Actualiza el estado con el cupón seleccionado
    setCuponSeleccionado(cupon);
    // Abre el segundo modal
    openSecondModal();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch(`https://couponapi2.azurewebsites.net/index.php/getCategories`);
      const data = await response.json();
      setCategorias(data);
      console.log(categorias);
    } catch (error) {
      console.error('Error al obtener las categorias:', error);
    }
  };

  useEffect(() => {
    fetchCupones();
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Usuario: {user}</h1>
      <h2>Listado de Cupones</h2>
      <button onClick={openModal}>Agregar Nuevo Cupón</button>
      <button onClick={fetchCupones}>Actualizar tabla</button>
      {/* Aquí colocarías tu tabla de cupones */}
      <Modal isOpen={isModalOpen} onClose={closeModal} user={user} categorias={categorias} />
      <table>
        <thead>
          <tr>
            <th>Nombre del Cupón</th>
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
      {/* Renderizar el segundo modal solo si hay un cupón seleccionado */}
      {cuponSeleccionado && (
        <Modal2 isOpen={isSecondModalOpen} onClose={closeSecondModal} cupon={cuponSeleccionado} categorias={categorias} />
      )}
      <Link to="/profile">Ir al Perfil de la Empresa</Link>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default HomePage;