import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddPost from './AddPost';
import postsReducer from '../features/posts/postsSlice';
import authReducer from '../features/auth/authSlice';

describe('AddPost', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
        auth: authReducer,
      },
    });
  });

  test('renders AddPost component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddPost />
      </Provider>
    );

    expect(getByText(/Add a new post/i)).toBeInTheDocument();
  });

  test('allows the user to add a new post', async () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <AddPost />
      </Provider>
    );

    fireEvent.change(getByRole('textbox'), {
      target: { value: 'New post' },
    });

    fireEvent.click(getByText(/Submit Post/i));
  });
});
