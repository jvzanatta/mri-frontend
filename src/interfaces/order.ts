
import { Customer } from './customer';

export interface Order {
  orderNumber: string;
  customer: Customer;
  orderDetails: {
    value: number;
    date: string;
  };
  shippingDetails: {
    date: string;
  };
  status: string;
};
