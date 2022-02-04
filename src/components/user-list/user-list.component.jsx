import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserList = ({ handleLogout }) => {
  const FETCH_USERS_URL = 'http://localhost:8080/api/users';
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    const access_token = sessionStorage.getItem('jwt_access_token');
    const jwtAccessToken = 'Bearer' + ' ' + access_token;
    axios
      .get(FETCH_USERS_URL, { headers: { Authorization: jwtAccessToken } })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log('Message = ' + error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography
          style={{
            textAlign: 'center',
          }}
          sx={{ mt: 4, mb: 2 }}
          variant='h3'
          component='div'
        >
          User
        </Typography>
        <Button
          onClick={handleLogout}
          style={{
            width: '50vw',
          }}
          className='submit-login'
          variant='contained'
          color='info'
          size='medium'
        >
          Logout
        </Button>
        {users.map(({ id, name, username, password, roles }, index) => {
          return (
            <List key={index} dense={true}>
              <ListItem>
                <ListItemText
                  primary='ID'
                  secondary={id}
                  style={{
                    borderBottom: 'black solid 1px',
                  }}
                />
                <ListItemText
                  primary='Name'
                  secondary={name}
                  style={{
                    borderBottom: 'black solid 1px',
                    textAlign: 'center',
                  }}
                />

                {roles.map((role, index) => (
                  <ListItemText
                    key={role.id}
                    primary='Role'
                    secondary={role.name}
                    style={{
                      borderBottom: 'black solid 1px',
                      textAlign: 'center',
                    }}
                  />
                ))}
              </ListItem>
            </List>
          );
        })}
        {users.map(({ id, name, username, password, roles }, index) => {
          return (
            <List key={index} dense={true}>
              <ListItem>
                <ListItemText
                  style={{
                    borderBottom: 'black solid 1px',
                  }}
                  primary='ID'
                  secondary={id}
                />

                <ListItemText
                  primary='Username'
                  secondary={username}
                  style={{
                    borderBottom: 'black solid 1px',
                    textAlign: 'center',
                  }}
                />

                {roles.map((role, index) => (
                  <ListItemText
                    key={role.id}
                    primary='Role'
                    secondary={role.name}
                    style={{
                      borderBottom: 'black solid 1px',
                      textAlign: 'center',
                    }}
                  />
                ))}
              </ListItem>
            </List>
          );
        })}
        {users.map(({ id, name, username, password, roles }, index) => {
          return (
            <List key={index} dense={true}>
              <ListItem>
                <ListItemText
                  style={{
                    borderBottom: 'black solid 1px',
                  }}
                  primary='ID'
                  secondary={id}
                />

                <ListItemText
                  primary='Password'
                  secondary={password}
                  style={{
                    borderBottom: 'black solid 1px',
                    textAlign: 'center',
                  }}
                />
                {roles.map((role, index) => (
                  <ListItemText
                    style={{
                      borderBottom: 'black solid 1px',
                      textAlign: 'center',
                    }}
                    key={role.id}
                    primary='Role'
                    secondary={role.name}
                  />
                ))}
              </ListItem>
            </List>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default UserList;
