import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente NotFound', () => {
  it('Verifica se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const TITLE_NOT_FOUND = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(TITLE_NOT_FOUND).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imageNotFound = screen.getByRole('img');
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
