import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductsPage({ usname, cart, setCart, products, addtocart, setUser, setUsname, setCartItems }) {
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

      <h1>Welcome {usname}!</h1>

      <div className='c-grid'>
        {products.map(prod => (
          <div className='c-prod' key={prod.name}>
            <img src={prod.imgurl} className='c-img' alt='book' />
            <br />
            Book: {prod.name}
            <br />
            Price: {prod.price}
            <br />
            <button onClick={() => addtocart(prod.name, prod)}>Add to cart</button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/cart')}>Go to Cart</button>
    </div>
  );
}

export default ProductsPage;
