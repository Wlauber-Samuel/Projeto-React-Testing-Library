import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente FavoritePokemon', () => {
  it('Verifica  se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const textNotFound = screen.getByText(/No favorite pokémon found/i);
    expect(textNotFound).toBeInTheDocument();
  });

  it('Verifica se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado?/i }));
    userEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));

    const findPokemon = screen.getByText(/Pikachu/i);
    expect(findPokemon).toBeInTheDocument();
  });
});
