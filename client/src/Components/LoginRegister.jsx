import React from 'react';
import { Login, Signup } from './AuthForm';

const LoginRegister = () => {
  return (
    <div>
      <div>
        <div>{Login}</div>
        <div>{Signup}</div>
      </div>
    </div>
  );
};

export default LoginRegister;
