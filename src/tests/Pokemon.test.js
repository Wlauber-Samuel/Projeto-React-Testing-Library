import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokemon', () => {
  it('Verifica se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByText(/average weight: 6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', '/pokemon/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const detail = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detail);

    const btnFav = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(btnFav);

    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toBeInTheDocument();
  });
});
