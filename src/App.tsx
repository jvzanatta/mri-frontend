import React from 'react';
import { OrdersPage } from './components/ordersPage/OrdersPage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <OrdersPage />
      </header>
    </div>
  );
}

export default App;
