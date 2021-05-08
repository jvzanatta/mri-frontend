import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@material-ui/core';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  fetchOrdersAsync,
  selectOrders,
  selectTotal
} from '../../reducers/order/order';

import { OrdersTable } from '../ordersTable/OrdersTable';

import './ordersPage.scss';

export function OrdersPage() {
  const dispatch = useAppDispatch();

  const total = useAppSelector(selectTotal);
  const orders = useAppSelector(selectOrders);

  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(fetchOrdersAsync())
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<{}>, tab: number) => {
    setTab(tab);
  };

  return (
    <div className={'OrdersPage'}>
      <div>
        <span className={'page-title'}>ORDERS</span>
        <div>
          <span className={'order-total'}>Total orders: <strong>${total}</strong> <span>USD</span></span>
        </div>
        <div>
          <Tabs className="Tabs" value={tab} onChange={handleChange} aria-label="simple tabs">
            <Tab label="All" />
            <Tab label="Shipped" />
          </Tabs>
        </div>
      </div>
      <div>
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
