import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { createRoutesFromElements } from 'react-router-dom';

const CartItem = (props) => {

    const {data} = props;
    const {cartItems, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext);
    // console.log(cartItems);
    // console.log(data);

  return (
    <div className="cartItem">
        <img src={data.image_url} alt={data.name}/>
        <h3>{data.name}</h3>
        <p>${data.cost}</p>
        <div className="countHandler">
                <button onClick={()=>removeFromCart(data.id)}> - </button>
                <input value={cartItems[data.id]} onChange={(e) => updateCartItemCount(Number(e.target.value), data.id)}/>
                <button onClick={()=>addToCart(data.id)}> + </button>
            </div>
    </div>
  )
}

export default CartItem;