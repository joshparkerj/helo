import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import store from './ducks/store';

import App from './App';

it('renders without crashing', () => {
  render(<Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>);
  const helo = screen.getByText(/helo/i);
  expect(helo).toBeInTheDocument();
});
