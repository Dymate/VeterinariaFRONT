import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout: React.FC = () => {
  return (
    <div className='auth-layout'>
      <div className='card'>
        <div className='logo'>
          <img className='logo' alt='logo' src={'https://upload.wikimedia.org/wikipedia/commons/1/17/Veterinary_symbol.svg'} />
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
