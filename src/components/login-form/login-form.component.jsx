import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import UserList from '../user-list/user-list.component';
import './login-form.styles.css';

export const LoginForm = () => {
  const url_connection = 'http://localhost:8080/api/login';

  const [user, setUser] = useState({ username: '', password: '' });
  const [isError, setError] = useState(false);
  const [isAuthenticated, setAuth] = useState(false);

  const authenticateToServer = () => {
    const params = new URLSearchParams();
    params.append('username', user.username);
    params.append('password', user.password);
    console.log(user);
    axios({ method: 'post', url: url_connection, data: params })
      .then((response) => {
        console.log(response);
        const jwtToken = {
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        };

        if (jwtToken.accessToken != null) {
          sessionStorage.setItem('jwt_access_token', jwtToken.accessToken);
          sessionStorage.setItem('jwt_refresh_token', jwtToken.refreshToken);
          setAuth(true);
          setError(false);
        }
      })
      .catch((error) => {
        console.log('Message = ' + error);
        setError(true);
      });
  };
  const handleLogin = () => {
    authenticateToServer();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jwt_access_token');
    sessionStorage.removeItem('jwt_refresh_token');
    setAuth(false);
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  if (isAuthenticated) {
    return <UserList handleLogout={handleLogout} />;
  } else {
    return (
      <div className='login-container'>
        <h1 className='title-login'>User Service</h1>
        <TextField
          className='input-login'
          variant='standard'
          name='username'
          label='Username'
          margin='dense'
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          className='input-login'
          variant='standard'
          name='password'
          label='Password'
          type='password'
          margin='dense'
          onChange={handleChange}
        />
        <br />
        <br />
        {isAuthenticated ? (
          <Button
            className='submit-login'
            variant='outlined'
            color='success'
            size='medium'
            disabled
            onClick={handleLogin}
          >
            Success
          </Button>
        ) : (
          <Button
            className='submit-login'
            variant='contained'
            color={isError ? 'warning' : 'inherit'}
            size='medium'
            onClick={handleLogin}
          >
            {isError ? 'Try Again' : 'Login'}
          </Button>
        )}
      </div>
    );
  }
};

export default LoginForm;
