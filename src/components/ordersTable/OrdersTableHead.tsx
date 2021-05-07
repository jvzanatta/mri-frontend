import React from 'react';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// import { Order } from '../../interfaces/order';
import './ordersTableHead.scss';

interface HeadCell {
  id: string;
  label: string;
  padding: string;
  orientation: 'left' | 'right';
}

const headCells: HeadCell[] = [
  { id: 'id', orientation: 'left', padding: 'none', label: 'ORDER NUMBER & DATE' },
  { id: 'shipping', orientation: 'left', padding: 'default', label: 'SHIPPING STATUS' },
  { id: 'address', orientation: 'left', padding: 'default', label: 'CUSTOMER ADDRESS' },
  { id: 'value', orientation: 'right', padding: 'default', label: 'ORDER VALUE' },
];

type TableOrder = 'asc' | 'desc';

interface Props {
  // classes: ReturnType<typeof useStyles>;
  onRequestSort: ((event: React.MouseEvent<unknown>, property: string) => void);
  // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Order) => void;
  tableOrder: TableOrder;
  orderBy: string;
  rowCount: number;
}

export function OrdersTableHead(props: Props) {
  const { tableOrder, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={'TableHead'}>
      <TableRow>
        <TableCell className={'TableHead'} padding="checkbox">
          <Checkbox
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={false}
            onChange={() => {}}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={'TableHead'}
            key={headCell.id}
            align={headCell.orientation}
            // padding={headCell.padding}
            sortDirection={orderBy === headCell.id ? tableOrder : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? tableOrder : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={'.visuallyHidden'}>
                  {tableOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className={'TableHead'} align={'center'}>
          <MoreVertIcon />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
