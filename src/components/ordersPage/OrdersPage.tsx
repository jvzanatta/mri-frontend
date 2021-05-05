import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from '@material-ui/core';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  ordersFetchAsync,
  selectOrders
} from './ordersPageActions';
import { OrdersTable } from '../ordersTable/OrdersTable';
import './ordersPage.scss';

export function OrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(ordersFetchAsync());
  }, []);

  console.log('OrdersPage', orders);

  const handleChange = () => {};

  return (
    <div>
      <div>
        <span>Orders</span>
        <div>
          <span>Total orders: <strong>$ TOTAL</strong> USD</span>
        </div>
        <div>
          <Tabs className="Tabs" value={0} onChange={handleChange} aria-label="simple tabs">
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
