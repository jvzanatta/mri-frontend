import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import { OrdersTableRow } from './OrdersTableRow';
import { OrdersTableHead } from './OrdersTableHead';

import { Order } from '../../interfaces/order';

import './ordersTable.scss';

type ColumnOrder = 'asc' | 'desc';

export interface Props {
  orders: Order[];
}

const sortOrders = (orders: Order[], orderBy: string, columnOrder: ColumnOrder) => {
  const isAsc = columnOrder === 'asc';

  return orders.sort((a: Order, b: Order) => {
    let comparison = 0;
    switch (orderBy) {
      case 'id':
        comparison = Number(a.orderNumber) > Number(b.orderNumber) ? 1 : -1;
        break;
      case 'shipping':
        comparison = a.status > b.status ? 1 : -1;
        break;
      case 'address':
        comparison = a.customer.address.line1 > b.customer.address.line1 ? 1 : -1;
        break;
      case 'value':
        comparison = Number(a.orderDetails.value) > Number(b.orderDetails.value) ? 1 : -1;
        break;
    }

    return isAsc ? comparison : comparison * -1;
  });
}

export default function OrdersTable(props: Props) {
  const [columnOrder, setColumnOrder] = useState<ColumnOrder>('asc');
  const [orderBy, setOrderBy] = useState('id');

  const page = 0;
  const rowsPerPage = 10;

  const { orders } = props;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = columnOrder === 'asc' && orderBy === property;
    
    setOrderBy(property);
    setColumnOrder(isAsc ? 'desc' : 'asc');
  };

  return (
    <div className={'OrdersTable'}>
        <TableContainer>
          <Table
            className={'.table'}
            aria-labelledby='tableTitle'
            size={'medium'}
            aria-label='enhanced table'
          >
            <OrdersTableHead
              columnOrder={columnOrder}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortOrders([...orders], orderBy, columnOrder)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => {
                  return (
                    <OrdersTableRow key={index} order={order} position={index} />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={0}
          onChangePage={() => {}}
          onChangeRowsPerPage={() => {}}
        />
    </div>
  );
}
