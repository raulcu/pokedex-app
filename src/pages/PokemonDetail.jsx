import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el parámetro 'name' de la URL
import '../styles/components.css'; 

function PokemonDetail() {
  const { name } = useParams(); // Extrae el nombre del Pokémon desde la URL
  const [pokemon, setPokemon] = useState(null); // Estado para guardar los datos del Pokémon
  const [notFound, setNotFound] = useState(false); // Estado para manejar si no se encuentra el Pokémon

  useEffect(() => {
    async function fetchPokemon() {
      try {
        // Intenta obtener los datos del Pokémon por nombre
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error('No encontrado'); // Si falla, marca como no encontrado
        const data = await res.json();
        setPokemon(data); // Guarda datos en el estado
        setNotFound(false); // Resetea el error si hubo uno previo
      } catch {
        setNotFound(true); // Marca error si no se encuentra o falla la petición
      }
    }

    fetchPokemon(); // Ejecuta la petición cada vez que cambia 'name'
  }, [name]);

  // Muestra mensaje si Pokémon no existe
  if (notFound) return (
    <div className="detail-page">
      <h2>Pokémon no encontrado</h2>
      <p>Verifica el nombre e intenta de nuevo.</p>
    </div>
  );

  // Muestra carga mientras llegan los datos
  if (!pokemon) return <p style={{ textAlign: 'center' }}>Cargando...</p>;

  // Muestra el detalle completo cuando los datos están disponibles
  return (
    <div className="detail-page">
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img
        className="detail-img"
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
      />

      <div className="detail-box">
        <h3>Habilidades:</h3>
        <ul>
          {pokemon.abilities.map((a, i) => (
            <li key={i}>{a.ability.name}</li> // Lista habilidades
          ))}
        </ul>

        <h3>Estadísticas:</h3>
        <ul>
          {pokemon.stats.map((s, i) => (
            <li key={i}>
              {s.stat.name}: {s.base_stat}  {/* Lista estadísticas */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetail;
