import axios from 'axios';
import React, { createContext, useState } from 'react'

export const ShopSellerContext = createContext(null);

export const ShopSellerContextProvider = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const shopSellerUserId = "ellie@ellie.com"; 

  const login = () => {
    axios.post("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/users/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        // Check if the logged-in user's ID matches the shop seller user ID
        if (response.data.userId === shopSellerUserId) {
          setLoginStatus(true);
          // Navigate to a different route if shopSellerUserId matches
          console.log("ok here")
          window.location.href = 'https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/'; // Adjust the route according to your application's routes
        } else {
          setLoginStatus(false);
          alert("You are not authorized to login as a shop seller.");
        }
      }
    }).catch(error => {
      console.error("Error logging in:", error);
      setLoginStatus(false);
    });
  }

  const userAuthenticated = () => {
    axios.get("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/users", {
      headers: {
        "token": localStorage.getItem("token"),
      }
    }).then((response) =>{
      console.log(response);
    }).catch(error => {
      console.error("Error authenticating user:", error);
    });
  }

  
  return (
    <div>
      <div className="login">
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>

      { loginStatus && (
        <button onClick={userAuthenticated}>Check if Authenticated</button>
      )}
    </div>
  )
}
