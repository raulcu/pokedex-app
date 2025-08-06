import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

function Home() {
    const [pokemons, setPokemons] = useState([]); // Estado para guardar la lista de pokémons

    useEffect(() => {
        async function fetchPokemons() {
            // Trae la lista inicial de pokémons (solo nombre y URL)
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            const data = await res.json();

            // Obtiene detalles completos de cada pokémon haciendo fetch en paralelo
            const details = await Promise.all(
                data.results.map((p) => fetch(p.url).then((res) => res.json()))
            );

            setPokemons(details); // Guarda los detalles en el estado
        }

        fetchPokemons(); // Ejecuta la función al montar el componente
    }, []);

    return (
        <div>
            <Navbar /> {/* Barra de navegación */}
            <SearchBar /> {/* Barra para buscar pokémons */}
            <div className="cards-container">
                {/* Mapea cada pokémon a un componente de tarjeta */}
                {pokemons.map(pokemon => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default Home;
