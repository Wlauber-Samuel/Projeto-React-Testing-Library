import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente PokemonDetails', () => {
  it('Verifica se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const pokemonNameDetail = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonNameDetail).toBeInTheDocument();
  });

  it('Verifica se não existe link de navegação para os detalhes do Pokémon selecionado', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const hideLinkNavegation = screen.queryByRole('link', { name: /more details/i });
    expect(hideLinkNavegation).not.toBeInTheDocument();
  });

  it('Verifica  seção de detalhes deve contém um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const detailsSession = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(detailsSession).toBeInTheDocument();
  });

  it('Verifica se a seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se na seção de detalhes existe um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const locationPikachu = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(locationPikachu).toBeInTheDocument();
  });

  it('Verifica se todas as localizações do Pokémon são mostradas na seção de detalhes', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);

    const locationPikachuOne = screen.getByText(/kanto viridian forest/i);
    const locationPikachuTwo = screen.getByText(/kanto power plant/i);
    expect(locationPikachuOne).toBeInTheDocument();
    expect(locationPikachuTwo).toBeInTheDocument();
  });

  it('Verifica se são  exibidos o nome da localização e uma imagem do mapa em cada localização', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const imagePokemon = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(imagePokemon).toHaveLength(2);
  });

  it('Verifica se a imagem da localização tem o atributo src com a URL da localização', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const srcImage = screen.getAllByRole('img');
    expect(srcImage[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(srcImage[2]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Verifica se a imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const altLocation = screen.getAllByAltText(/pikachu location/i);
    expect(altLocation).toHaveLength(2);
  });

  it('Verifica se a página exibe um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const checkboxFavoritePokemon = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    expect(checkboxFavoritePokemon).toBeInTheDocument();
  });

  it('Verifica se cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos', () => {
    renderWithRouter(<App />);
    const linkNavegation = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkNavegation);
    const alternateClicks = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(alternateClicks);

    const firstClick = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(firstClick).toBeInTheDocument();
    userEvent.click(alternateClicks);

    const secondClick = screen.queryByAltText(/pikachu is marked as favorite/i);
    expect(secondClick).not.toBeInTheDocument();
  });
});
