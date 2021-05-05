import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataGrid, GridRowsProp, GridRowData, GridColDef } from '@material-ui/data-grid';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Order } from '../../interfaces/order';

/* <FontAwesomeIcon icon={["far", "ellipsis-v"]} /> */
interface Props {
  orders: Order[];
}

export function OrdersTable(props: Props) {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<GridRowData[]>([]);


  const mapOrderToRow = (order: Order): GridRowData => {
    return {
      id: order.orderNumber,
      col1: order.orderNumber,
      col2: order.shippingDetails.date.toDateString(),
      col3: order.customer.address.line1,
      col4: order.orderDetails.value
    };
  };

  useEffect(() => {
    const newRows = props.orders.map(mapOrderToRow);
    setRows(newRows);
  }, [props.orders]);

  console.log('OrdersTable props', props);
  console.log('OrdersTable rows', rows);

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'ORDER NUMBER & DATE', width: 300 },
    { field: 'col2', headerName: 'SHIPPING STATUS', width: 300 },
    { field: 'col3', headerName: 'CUSTOMER ADDRESS', width: 300 },
    { field: 'col4', headerName: 'ORDER VALUE', width: 300 },
  ];

  return (
    <div className='OrdersTable'>
      <DataGrid rows={rows} columns={columns} autoHeight checkboxSelection pageSize={10} />
    </div>
  );
}
