import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';

import { Order } from '../../interfaces/order';

import './ordersTableRow.scss';

interface Props {
  order: Order;
  position: number;
}

function firstUppercase(string: string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function OrdersTableRow(props: Props) {
  const { 
    position,
    order: {
      status,
      orderNumber,
      orderDetails: {
        date,
        value
      },
      shippingDetails,
      customer: {
        address: {
          line1,
          line2,
          city,
          state,
          zip
        }
      }
    } 
  } = props;
  
  const labelId = `enhanced-table-checkbox-${position}`;

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={orderNumber}
      className="TableRow"
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={false}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row">
        <div className="order-id"># {orderNumber}</div>
        <div className="order-date">Ordered: {moment(date).format('MMM. D, YYYY')}</div>
      </TableCell>
      <TableCell>
        <div className="shipping-status">
          <Chip
            size="small"
            icon={<FiberManualRecordIcon />}
            label={firstUppercase(status)}
          />
        </div>
        <div className="shipping-date">
          Updated: {moment(shippingDetails.date).format('DD/MMM/YYYY').toUpperCase()}
        </div>
      </TableCell>
      <TableCell>
        <div className="address-line">{line1} {line2}</div>
        <div className="address-line">{city}, {state} {zip}</div>
      </TableCell>
      <TableCell align="right">
        <div className="price-value">${value}</div>
        <div className="price-currency">USD</div>
      </TableCell>
      <TableCell align="center">
        <MoreVertIcon />
      </TableCell>
    </TableRow>
  );
}
