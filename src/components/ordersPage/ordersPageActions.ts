import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchOrders } from '../../services/ordersApi';
import { Order } from '../../interfaces/order';

export interface OrderState {
  orders: Order[];
  isLoading: boolean;
};

const initialState: OrderState = {
  orders: [],
  isLoading: false,
};

export const ordersFetchAsync = createAsyncThunk(
  'order/fetchOrder',
  async () => {
    const response = await fetchOrders();
    console.log(await response.json());
    return await response.json();
  });

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(ordersFetchAsync.pending, (state) => {
        state.isLoading = true;
        console.log('isLoading', true);
      })
      .addCase(ordersFetchAsync.fulfilled, (state, action) => {
        console.log('isLoading', false);
        state.isLoading = false;
        console.log('action', action);
        state.orders = action.payload;
      });
  },
});

export const selectOrders = (state: RootState) => state.order.orders;

export default orderSlice.reducer;
