import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegar programáticamente
import '../styles/components.css';

function SearchBar() {
  const [search, setSearch] = useState(''); // Estado para controlar el valor del input
  const navigate = useNavigate(); // Hook para cambiar rutas

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página recargue
    if (search.trim() !== '') {
      // Navega a la ruta del Pokémon en minúsculas
      navigate(`/pokemon/${search.toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search} // Controla el input con el estado
        onChange={(e) => setSearch(e.target.value)} // Actualiza el estado con lo que escribe el usuario
      />
      <button type="submit">Buscar</button> {/* Botón para enviar el formulario */}
    </form>
  );
}

export default SearchBar;
