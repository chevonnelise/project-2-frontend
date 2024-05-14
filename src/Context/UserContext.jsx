import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [userId, setUserID] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        const retrieveData = async () => {
            try {
                let defaultUserName = localStorage.getItem("username")
                    ? localStorage.getItem("username")
                    : "";
                let defaultemail = localStorage.getItem("email")
                    ? localStorage.getItem("email")
                    : "";
                let accessToken = localStorage.getItem("accessToken")
                    ? localStorage.getItem("accessToken")
                    : "";
                let refreshToken = localStorage.getItem("refreshToken")
                    ? localStorage.getItem("refreshToken")
                    : "";
                let defaultUser = localStorage.getItem("UserId")
                    ? localStorage.getItem("UserId")
                    : 0;
                setUsernameReg(defaultUserName);
                setEmail(defaultemail);
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
            } catch (err) {
                console.err("Error in retrieving username, id and token", err);
            }
        }
    })
    // axios.defaults.withCredentials = true;

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
                "Authorization": "Bearer" + localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
        })
    }

    const context = {
        loginStatus,
    }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
}