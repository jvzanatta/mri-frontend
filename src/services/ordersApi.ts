
const root = 'https://gist.githubusercontent.com/ryanjn/07512cb1c008a5ec754aea6cbbf4afab/raw/eabb4d324270cf0d3d17a79ffb00ff3cfaf9acc3/';

export const fetchOrders = () => 
  window.fetch(`${root}/orders.json`);
