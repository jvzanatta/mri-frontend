import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { OrdersPage } from './components/ordersPage/OrdersPage';
import './App.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <OrdersPage />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
