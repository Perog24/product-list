import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import mainStore from './store';

test('renders learn react link', () => {
  render(
    <Provider store = {mainStore}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/product list/i);
  expect(linkElement).toBeInTheDocument();
});
