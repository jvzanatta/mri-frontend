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
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   // state.value += 1;
    // },
    // decrement: (state) => {
    //   // state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   // state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
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

// export const { increment, decrement, incrementByAmount } = orderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.order.value)`
export const selectOrders = (state: RootState) => state.order.orders;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectOrders(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default orderSlice.reducer;
