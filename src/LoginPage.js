import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ username, setUsername, password, setPassword, login, setLogin, user, setUser, register, setUsname,setCart,setCartItems }) {
  const navigate=useNavigate();
  function add() {
    fetch('http://localhost:5000/add', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(res => res.json())
      .then((data) => {
        setCart(data.cart);
        setUser(data.message);
        setUsname(data.usname);
        setCartItems([]);
        if (data.message === 'user') {
          navigate('/products');
        }
      });
  }
  
  return (
    <div className="App">
      {login === 'login' && user !== 'user' ? (
        <div className='login'>
          <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
          <br />
          <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          <br />
          <button onClick={add}>Login</button>
          <br />
          <b>New to the bookstore then </b>
          <button onClick={() => setLogin('reg')}>Register</button>
        </div>
      ) : (
        ""
      )}

      {login === 'reg' ? (
        <div>
          <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
          <br />
          <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          <br />
          <button onClick={() => {
            setLogin('login');
            register();
          }}>Register</button>
          <br />
          <b>Already a user? </b><button onClick={() => setLogin('login')}>Login</button>
        </div>
      ) : (
        ""
      )}

      {user === 'invalid' ? (
        <div>
          <h3>Invalid Username or password</h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default LoginPage;
