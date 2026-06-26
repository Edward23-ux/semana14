import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CharactersList from './CharactersList';

const mockCharactersResponse = {
  results: [
    { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive' },
    { id: 2, name: 'Morty Smith', species: 'Human', status: 'Alive' },
  ],
};

beforeEach(() => {
  // Simulamos la respuesta de fetch que usa el adapter de Alova.
  global.fetch = vi.fn().mockImplementation(() => {
    const response = {
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockCharactersResponse),
    };
    response.clone = () => response;
    return Promise.resolve(response);
  });
});

describe('CharactersList', () => {
  it('muestra el estado de carga inicialmente', () => {
    render(<CharactersList />);
    expect(screen.getByRole('status')).toHaveTextContent(/cargando/i);
  });

  it('renderiza los personajes obtenidos a través de Alova', async () => {
    render(<CharactersList />);

    const list = await screen.findByTestId('characters-list');
    expect(list).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('muestra un mensaje de error si la petición falla', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    render(<CharactersList />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/error/i);
  });
});
