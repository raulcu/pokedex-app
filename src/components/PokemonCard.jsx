import React from 'react';
import { Link } from 'react-router-dom'; // Para navegar al detalle del Pokémon
import '../styles/components.css';

function PokemonCard({ pokemon }) {
  // Desestructuramos las propiedades que necesitamos
  const { name, sprites, abilities } = pokemon;
  // Obtenemos la imagen oficial del Pokémon (si existe)
  const image = sprites?.other['official-artwork'].front_default;

  return (
    // Envolvemos la tarjeta con Link para hacerla clickeable y navegar a la ruta del Pokémon
    <Link to={`/pokemon/${name}`} className="card-link">
      <div className="pokemon-card">
        {/* Imagen del Pokémon */}
        <img src={image} alt={name} />
        {/* Nombre del Pokémon en mayúsculas */}
        <h3>{name.toUpperCase()}</h3>
        <p><strong>Habilidades:</strong></p>
        {/* Listamos las habilidades */}
        <ul>
          {abilities.map((a, i) => (
            <li key={i}>{a.ability.name}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default PokemonCard;
