// FILEPATH: /Users/chrisminnick/code/src/github.com/chrisminnick/soliloquy/client/src/pages/LogoutPage.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Logout from './LogoutPage';
import authReducer from '../features/auth/authSlice';

describe('Logout', () => {
  let store;
  let history;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    history = createMemoryHistory();
  });

  test('renders Logout component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Logout />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Logout Page')).toBeInTheDocument();
  });

  test('calls logout, setToken, and setUser actions on render', () => {
    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }));

    render(
      <Provider store={store}>
        <Router history={history}>
          <Logout />
        </Router>
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });

  test('removes token from localStorage on render', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Logout />
        </Router>
      </Provider>
    );

    expect(removeItemSpy).toHaveBeenCalledWith('token');
  });

  test('navigates to home page on render', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Logout />
        </Router>
      </Provider>
    );

    expect(history.location.pathname).toBe('/');
  });
});
