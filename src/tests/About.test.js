import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente About', () => {
  it('Verifica se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const about = screen.getByRole('heading', { name: /about/i });
    expect(about).toBeInTheDocument();
  });

  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphOne = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(paragraphOne).toBeInTheDocument();

    const paragraphTwo = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a  imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
