import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import ProductsPage from './ProductsPage';
import CartPage from './CartPage';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [CartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState('');
  const [usname, setUsname] = useState('');
  const [login, setLogin] = useState('login');

  const products = [
    { name: "book1", price: 799, imgurl: "https://5.imimg.com/data5/SELLER/Default/2021/2/SA/IQ/HS/49559104/img-20210211-121925.jpg" },
    { name: "book2", price: 599, imgurl: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781481409209/story-thieves-9781481409209_hr.jpg" },
    { name: "book3", price: 699, imgurl: "https://offshootbooks.com/cdn/shop/products/Pinochiocover.jpg?v=1652433434" },
    { name: "book4", price: 699, imgurl: "https://img1.exportersindia.com/product_images/bc-full/dir_136/4065051/best-of-series-story-books-p-b-bw-1514537556-3549957.jpeg" },
    { name: "book5", price: 899, imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY8Oc8z0I1nugRQoxuxdzsTImWmUn-fU3TUuXGgFl1dw&s" }
  ]

  useEffect(() => {
    if (CartItems.length === 0) {
      display();
    }
  }, [CartItems]);

  function display() {
    const initialCartItems = cart
      .map(cartItem => {
        const product = products.find(prod => prod.name === cartItem);
        return product ? { product: product, quantity: 1 } : null;
      })
      .filter(item => item !== null); // Filter out invalid items
    setCartItems(initialCartItems);
  }

  function addtocart(name, prod) {
    fetch('http://localhost:5000/addtocart', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usname, book: name })
    })
      .then(res => res.json())
      .then((data) => { setCart(data.cart) })

    const exprodind = CartItems.findIndex(item => item.product.name === prod.name);
    if (exprodind !== -1) {
      const upcart = [...CartItems];
      CartItems[exprodind].quantity++;
      setCartItems(upcart);
    }
    else {
      setCartItems(prevCartItems => [...prevCartItems, { product: prod, quantity: 1 }])
    }
  }

  function removefromcart(name) {
    fetch('http://localhost:5000/removefromcart', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usname, book: name })
    })
      .then(res => res.json())
      .then((data) => setCart(data.cart))

    
  }

  const filteredcart = CartItems.filter(item => cart.includes(item.product.name));
  const totalprice = filteredcart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  function updatequantity(index, newquantity) {
    if (newquantity >= 0) {
      const upcart = [...CartItems];
      CartItems[index].quantity = newquantity;
      setCartItems(upcart);
    }
  }

  function register() {
    fetch('http://localhost:5000/reg', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    })
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<LoginPage 
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            login={login} setLogin={setLogin}
            user={user} setUser={setUser}
            setCart={setCart} setUsname={setUsname}
            setCartItems={setCartItems}
            register={register}
          />}
        />
        <Route
          path="/products"
          element={
            user === 'user' ? (
              <ProductsPage
                usname={usname} cart={cart}
                setCart={setCart} products={products}
                addtocart={addtocart} setUser={setUser}
                setUsname={setUsname} setCartItems={setCartItems}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            user === 'user' ? (
              <CartPage
                cart={cart} setCart={setCart}
                CartItems={CartItems} setCartItems={setCartItems}
                filteredcart={filteredcart} totalprice={totalprice}
                updatequantity={updatequantity} removefromcart={removefromcart}
                display={display} setUser={setUser}
                setUsname={setUsname}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
