import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App', () => {
  it('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFavoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkFavoritePokemon).toBeInTheDocument();
  });

  it('Verifica se a aplicação é redirecionada para a página inicial, na URL "/" ao clicar no link Home da barra de navegação', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkToHome);
  });

  it('Verifica se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
  });

  it('Verifica se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemons);
  });

  it('Verifica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/xablau');
    });

    const pageNotFound = screen.getByRole('heading', { name: /not found/i });
    expect(pageNotFound).toBeInTheDocument();
  });
});
