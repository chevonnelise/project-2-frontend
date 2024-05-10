import axios from 'axios';
import React, { createContext, useState } from 'react'

export const UserContext = createContext(null);

const UserContextProvider = () => {
    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    axios.defaults.withCredentials = true;

    const register = async () => {
        setLoading(true);

        // Check if passwords match
        if (passwordReg !== confirmPasswordReg) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // Send registration data to the server
            const response = await axios.post('https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/users/register', { 
                username: usernameReg,
                email: emailReg,
                password: passwordReg
            });
            console.log(response.data);
            alert('Registration successful');
        } catch (error) {
            setError(error.response.data.error || 'An error occurred during registration');
        } finally {
            setLoading(false); // for exceptions
        }
    };


    const login = () => {
        axios.post("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/users/login", {
            email: email,
            password: password,
        }).then((response) => {
            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                console.log(response.data);
                localStorage.setItem("token", response.data.token)
                setLoginStatus(true);
            }
        })
    }

    const userAuthenticated = () => {
        axios.get("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/users", {
            headers: {
                "token": localStorage.getItem("token"),
            }
        }).then((response) =>{
            console.log(response);
        })
    }

    return (
        <div>
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <label>Email</label>
                <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => {
                        setEmailReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    type="text"
                    placeholder="password"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <label>Confirm Password</label>
                <input
                    type="text"
                    placeholder="confirm password"
                    onChange={(e) => {
                        setConfirmPasswordReg(e.target.value);
                    }}
                />
                <button onClick={register}>Register</button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <label>Email</label>
                <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    type="text"
                    placeholder="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={login}>Login</button>
            </div>

            { loginStatus && (
                <button onClick={userAuthenticated}>Check if Authenticated</button>
            )}
        </div>
    )
}

export default UserContext