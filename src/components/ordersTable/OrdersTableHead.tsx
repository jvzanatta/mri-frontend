import React from 'react';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

type ColumnOrder = 'asc' | 'desc';

interface Props {
  onRequestSort: ((event: React.MouseEvent<unknown>, property: string) => void);
  columnOrder: ColumnOrder;
  orderBy: string;
}

export function OrdersTableHead(props: Props) {
  const { columnOrder, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={'TableHead'}>
      <TableRow>
        <TableCell className={'TableHead'} padding="checkbox">
          <Checkbox
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
            sortDirection={orderBy === headCell.id ? columnOrder : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? columnOrder : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
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
