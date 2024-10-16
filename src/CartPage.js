import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage({ cart, setCart, CartItems, setCartItems, filteredcart, totalprice, updatequantity, removefromcart, display, setUser, setUsname }) {
  const navigate = useNavigate();

  return (
    <div className="App">
      <button onClick={() => {
        setUser('');
        setCart([]);
        setUsname('');
        setCartItems([]);
        navigate('/login');
      }}>Logout</button>
      <h1>Cart</h1>

      {filteredcart.map((item, index) => (
        <div className='c-prod' key={item.product.name}>
          <img src={item.product.imgurl} className='c-img' alt='book' />
          <br />
          Book: {item.product.name}
          <br />
          Price: {item.product.price}
          <br />
          Quantity: <input type="number" value={item.quantity} onChange={(e) => updatequantity(index, parseInt(e.target.value))} />
          <br />
          <button onClick={() => {
            removefromcart(item.product.name);
            item.quantity=0;
          }}>Remove from cart</button>
        </div>
      ))}

      <h3>Total Price: {totalprice}</h3>
      <br />

      <button onClick={() => navigate('/products')}>Go to Products</button>
    </div>
  );
}

export default CartPage;
