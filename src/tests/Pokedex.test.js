import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex', () => {
  it('Verifica se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);
    expect(nextPokemon).toBeInTheDocument();
    expect(firstPokemon).toHaveTextContent(/charmander/i);
  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonFilterID = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilterID).toHaveLength(7);

    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    const firePokemons = screen.getByTestId('pokemon-type');
    expect(firePokemons).toBeInTheDocument();
    expect(firePokemons).toHaveTextContent('Fire');

    const DragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(DragonButton);
    const dragonPokemon = screen.getByTestId('pokemon-type');
    expect(dragonPokemon).toBeInTheDocument();
    expect(dragonPokemon).toHaveTextContent('Dragon');

    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    const PIKACHU = screen.getByText(/pikachu/i);
    expect(PIKACHU).toBeInTheDocument();
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const pokeFilterAll = screen.getByText('All');
    userEvent.click(pokeFilterAll);
    expect(pokeFilterAll).toBeInTheDocument();
  });
});
