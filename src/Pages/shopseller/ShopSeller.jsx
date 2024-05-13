import React from 'react';
import { ShopSellerContextProvider } from '../../Context/ShopSellerContext';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const ShopSeller = () => {
  
  return (
    <div>
      <ShopSellerContextProvider>
        <AddProduct />
        <EditProduct />
      </ShopSellerContextProvider>
    </div>
  )
}

export default ShopSeller;
