import { useRequest } from 'alova/client';
import { getPosts } from '../api/alovaInstance';

export default function PostsList() {
  const { loading, data, error } = useRequest(getPosts());

  if (loading) return <p role="status">Cargando publicaciones...</p>;
  if (error) return <p role="alert">Error al cargar datos: {error.message}</p>;

  return (
    <ul className="posts-list" data-testid="posts-list">
      {data?.map((post) => (
        <li key={post.id} className="posts-list__item">
          <strong>{post.title}</strong>
        </li>
      ))}
    </ul>
  );
}
