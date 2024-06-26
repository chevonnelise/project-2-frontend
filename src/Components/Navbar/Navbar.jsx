import React, {useState} from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import {ShoppingCart} from "phosphor-react";

const Navbar = () => {

    const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt=""/>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none', color: 'rgb(19, 88, 18)'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none', color: 'rgb(19, 88, 18)'}} to='/shop'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("about")}}><Link style={{textDecoration:'none', color: 'rgb(19, 88, 18)'}} to='/about'>About</Link>{menu==="about"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("contact")}}><Link style={{textDecoration:'none', color: 'rgb(19, 88, 18)'}} to='/contact'>Contact</Link>{menu==="contact"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart' style={{ color: 'black' }}><ShoppingCart size={32}/></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

export default Navbar