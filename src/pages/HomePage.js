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
      alert("Cupon agregado");

      if (!response.ok) {
        throw new Error('Error al agregar el cupón');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
    }
  };


  if (!isOpen) return null;

  return (
    <div id="modal" class="modal">
      <div class="modal-content">
      
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

          <label htmlFor="descuento">Descuento: </label>
          <input type="number" id="descuento" name="descuento" required/><br/>

          <label htmlFor="categoria">Categoría:</label>
            
          <select id="categoria" name="categoria">
        {/* Usando map para crear opciones */}
        {categorias.map(categoria => (
          <option key={categoria.id} value={categoria.id}>{categoria.nombreCategoria}</option>
        ))}
      </select>

          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" required/><br/>

          <label htmlFor="image">Url imagen:</label>
          <input type="text" id="image" name="image" required/><br/>

          <button type="submit">Añadir Cupón</button>
        </form>
        
      </div>
    </div>
  );
};


const Modal2 = ({ isOpen, onClose, cupon, categorias, user }) => {
  
  const [formData, setFormData] = useState({
    nombre: cupon.nombre,
    fechaInicio: cupon.fecha_inicio,
    fechaVencimiento: cupon.fecha_vencimiento,
    precio: cupon.precio,
    estado: cupon.estado,
    categoria: cupon.categoria,
    descuento: cupon.descuento,
    cantidad: cupon.cantidad,
    image: cupon.image
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nombre: String(formData.nombre),
      fechaInicio: String(formData.fechaInicio),
      fechaVencimiento: String(formData.fechaVencimiento),
      precio: String(formData.precio),
      estado: String(formData.estado),
      categoria: String(formData.categoria),
      descuento: String(formData.descuento),
      cantidad: String(formData.cantidad),
      nombre_usuario: String(user),
      image: String(formData.image)
    };

    try {
      const response = await fetch('https://couponapi2.azurewebsites.net/index.php/updateCupon', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error al actualizar el cupón: ${response.status} - ${errorDetails}`);
      }

      const result = await response.json();
      alert('Cupón actualizado exitosamente');

    } catch (error) {
      console.error('Error en la solicitud fetch:', error.message);
      
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    setFormData({
      nombre: cupon.nombre,
      fechaInicio: cupon.fecha_inicio,
      fechaVencimiento: cupon.fecha_vencimiento,
      precio: cupon.precio,
      estado: cupon.estado,
      descuento: cupon.descuento,
      categoria: cupon.categoria,
      cantidad: cupon.cantidad
    });
  }, [cupon]);

  if (!isOpen) return null;

  return (
    <div id="modal" class="modal">
      <div class="modal-content">
        <h2>Actualizar información del {cupon.nombre}</h2>
        <button onClick={onClose} className="modal-close-button">Cerrar</button>
        
        <form id="cuponForm" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required /><br/>

          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input type="datetime-local" id="fechaInicio" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required /><br/>

          <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
          <input type="datetime-local" id="fechaVencimiento" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} required /><br/>

          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} step="0.01" required /><br/>

          <label htmlFor="estado">Estado:</label>
          <select id="estado" name="estado" value={formData.estado} onChange={handleChange}>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select><br/>

          <label htmlFor="descuento">Descuento: </label>
          <input type="number" id="descuento" name="descuento" value={formData.descuento} onChange={handleChange} required /><br/>

          <label htmlFor="categoria">Categoría:</label>
          <select id="categoria" name="categoria" value={formData.categoria} onChange={handleChange}>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>{categoria.nombreCategoria}</option>
            ))}
          </select><br/>

          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} required /><br/>

          <label htmlFor="image">Url imagen:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required/><br/>

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
  
  const [loading, setLoading] = useState(true);

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
    
    const cupon = cupones.find(cupon => cupon.id === cuponId);
    
    setCuponSeleccionado(cupon);
    
    openSecondModal();
  };

  const fetchCupones = async () => {
    setCupones([]);
    try {
      const response = await fetch(`https://couponapi2.azurewebsites.net/index.php/getCoupon?usuarioEmpresa=${user}`);
      const data = await response.json();
      setCupones(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los cupones:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`https://couponapi2.azurewebsites.net/index.php/getCategories`);
      const data = await response.json();
      setCategorias(data);
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
      <button><Link to="/profile">Ir al Perfil de la Empresa</Link></button>
      <button onClick={openModal}>Agregar Nuevo Cupón</button>
      <button onClick={fetchCupones}>Actualizar tabla</button>
      
      <Modal isOpen={isModalOpen} onClose={closeModal} user={user} categorias={categorias} />

      {loading ? (
        <p>Cargando...</p>
      ) : (
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
      )}
      
      
      {cuponSeleccionado && (
        <Modal2 isOpen={isSecondModalOpen} onClose={closeSecondModal} cupon={cuponSeleccionado} categorias={categorias} user={user} />
      )}
      
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default HomePage;