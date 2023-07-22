import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import mainStore from './store';
import {router} from './index'
import { RouterProvider } from 'react-router-dom';

test('renders App.jsx', () => {
  render(
    <Provider store = {mainStore}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  );
  const linkElement = screen.getByText(/product list/i);
  expect(linkElement).toBeInTheDocument();
});
