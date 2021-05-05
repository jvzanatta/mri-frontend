
import { Customer } from './customer';

export interface Order {
  orderNumber: number;
  customer: Customer;
  orderDetails: {
    value: number;
    date: Date;
  };
  shippingDetails: {
    date: Date;
  };
  status: string;
};
