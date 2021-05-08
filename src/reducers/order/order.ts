import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchOrders } from '../../services/ordersApi';
import { Order } from '../../interfaces/order';

interface OrderState {
  orders: Order[];
  ordersTotal: string;
  isLoading: boolean;
};

const initialState: OrderState = {
  orders: [],
  ordersTotal: '-',
  isLoading: false,
};

const formatOrder = (rawOrder: any) => {
  return {
    orderNumber: rawOrder.order_number,
    customer: {
      firstName: rawOrder.customer.first_name,
      lastName: rawOrder.customer.last_name,
      address: {
        line1: rawOrder.customer.address.line1,
        line2: rawOrder.customer.address.line2,
        city: rawOrder.customer.address.city,
        state: rawOrder.customer.address.state,
        zip: rawOrder.customer.address.zip,
      },
    },
    orderDetails: {
      value: rawOrder.order_details.value,
      date: rawOrder.order_details.date,
    },
    shippingDetails: {
      date: rawOrder.shipping_details.date,
    },
    status: rawOrder.status,
  }
}

const calculateTotal = (total: number, order: Order) => total + order.orderDetails.value;

export const fetchOrdersAsync = createAsyncThunk(
  'order/fetchOrder',
  async () => {
    const response = await fetchOrders();
    const jsonResponse = await response.json();
    return jsonResponse;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.map(formatOrder);
        const total = state.orders.reduce(calculateTotal, 0);
        state.ordersTotal = total.toString();
      });
  }
});

export const selectOrders = (state: RootState) => state.order.orders;
export const selectTotal = (state: RootState) => state.order.ordersTotal;

export default orderSlice.reducer;
