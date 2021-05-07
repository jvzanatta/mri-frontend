import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { OrdersTableRow } from './OrdersTableRow';
import { OrdersTableHead } from './OrdersTableHead';

import { Order } from '../../interfaces/order';

type TableOrder = 'asc' | 'desc';

interface Props {
  orders: Order[];
}

export function OrdersTable(props: Props) {
  const [tableOrder, setOrder] = useState<TableOrder>('asc');
  const [orderBy, setOrderBy] = useState('id');

  const page = 0;
  const rowsPerPage = 10;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && tableOrder === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.orders.length - page * rowsPerPage);

  return (
    <div className={'OrdersTable'}>
        <TableContainer>
          <Table
            className={'.table'}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <OrdersTableHead
              // classes={classes}
              // numSelected={selected.length}
              tableOrder={tableOrder}
              orderBy={orderBy}
              // onSelectAllClick={() => {}}
              onRequestSort={handleRequestSort}
              rowCount={props.orders.length}
            />
            <TableBody>
              { //stableSort(props.orders, getComparator(tableOrder, orderBy))
              props.orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => {
                  return (
                    <OrdersTableRow key={index} order={order} position={index} />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.orders.length}
          rowsPerPage={rowsPerPage}
          page={0}
          onChangePage={() => {}}
          onChangeRowsPerPage={() => {}}
        />
    </div>
  );
}
