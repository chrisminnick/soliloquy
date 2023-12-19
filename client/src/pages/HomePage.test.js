import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders HomePage component', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  test('renders Login link', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const linkElement = screen.getByText('Login');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/login');
  });
});
