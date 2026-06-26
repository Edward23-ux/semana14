import { useRequest } from 'alova/client';
import { getCharacters } from '../api/alovaInstance';

export default function CharactersList() {
  const { loading, data, error } = useRequest(getCharacters());

  if (loading) return <p role="status">Cargando personajes...</p>;
  if (error) return <p role="alert">Error al cargar datos: {error.message}</p>;


  const characters = data?.results || [];

  return (
    <ul className="characters-list" data-testid="characters-list">
      {characters.map((char) => (
        <li key={char.id} className="characters-list__item">
          <strong>{char.name}</strong> - {char.species} ({char.status})
        </li>
      ))}
    </ul>
  );
}
