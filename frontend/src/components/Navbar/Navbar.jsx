// components/Navbar.jsx
import React, { useState } from 'react';
import { searchEquipment } from '../../actions/api';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Realiza la búsqueda en la API utilizando la función de utilidad
      const searchResults = await searchEquipment(searchValue);

      // Maneja los resultados de la búsqueda, por ejemplo, actualizando el estado de la aplicación
      console.log('Resultados de búsqueda:', searchResults);

    } catch (error) {
      // Maneja los errores de manera adecuada, por ejemplo, mostrando un mensaje de error al usuario
      console.error('Error al realizar la búsqueda:', error.message);
    }
  };

  const handleSearchClick = async () => {
    try {
      // Realiza la búsqueda en la API utilizando la función de utilidad
      const searchResults = await searchEquipment(searchValue);

      // Maneja los resultados de la búsqueda, por ejemplo, actualizando el estado de la aplicación
      console.log('Resultados de búsqueda:', searchResults);

    } catch (error) {
      // Maneja los errores de manera adecuada, por ejemplo, mostrando un mensaje de error al usuario
      console.error('Error al realizar la búsqueda:', error.message);
    }
  };

  return (
    <nav>
      <div className="logo">
        Logo
      </div>
      <div className="search">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar elementos..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
        <button onClick={handleSearchClick}>Buscar</button>
      </div>
      <div className="links">
        <a href="/">Inicio</a>
        <a href="/equipos">Equipos</a>
        <a href="/contrasenas">Contraseñas</a>
      </div>
    </nav>
  );
};

export default Navbar;
