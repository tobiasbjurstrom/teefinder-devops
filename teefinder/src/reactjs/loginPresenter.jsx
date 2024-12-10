import React, { useState } from 'react';
import axios from 'axios';
import LoginView from '../views/loginView';

const LoginPresenter = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
 
  };

  return (
    <LoginView
      username={username}
      password={password}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
      errorMessage={errorMessage}
    />
  );
};

export default LoginPresenter;
