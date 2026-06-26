import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PostsList from './PostsList';

const mockPosts = [
  { id: 1, title: 'Primer post de prueba' },
  { id: 2, title: 'Segundo post de prueba' },
];

beforeEach(() => {
  // Simulamos la respuesta de fetch que usa el adapter de Alova,
  // así el test no depende de la red real ni de jsonplaceholder.
  // Alova internamente llama a response.clone(), por eso lo incluimos.
  global.fetch = vi.fn().mockImplementation(() => {
    const response = {
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockPosts),
    };
    response.clone = () => response;
    return Promise.resolve(response);
  });
});

describe('PostsList', () => {
  it('muestra el estado de carga inicialmente', () => {
    render(<PostsList />);
    expect(screen.getByRole('status')).toHaveTextContent(/cargando/i);
  });

  it('renderiza los posts obtenidos a través de Alova', async () => {
    render(<PostsList />);

    const list = await screen.findByTestId('posts-list');
    expect(list).toBeInTheDocument();
    expect(screen.getByText('Primer post de prueba')).toBeInTheDocument();
    expect(screen.getByText('Segundo post de prueba')).toBeInTheDocument();
  });

  it('muestra un mensaje de error si la petición falla', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    render(<PostsList />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/error/i);
  });
});
