import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../Models';
import { logout } from '../../Services';
import './Header.css';

export const Header: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='header'>
      <div className='logo'>
        <img
          className='logo'
          alt='logo'
          height='50'
          src={'https://upload.wikimedia.org/wikipedia/commons/1/17/Veterinary_symbol.svg'}
        />
      </div>
      <div className='user-info'>
        <div>{user.name} {user.lastname}</div>
        <div>Veterinario</div>
        <div onClick={handleLogout} className='link'>Logout</div>
      </div>
    </div>
  );
};