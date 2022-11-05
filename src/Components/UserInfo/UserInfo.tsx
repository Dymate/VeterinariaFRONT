import React from 'react';
import { User } from '../../Models';
import './UserInfo.css';

export const UserInfo: React.FC<{ user: User }> = ({ user }) => (
  <div className='user-info-container'>
    <h3>{user.name} {user.lastname}</h3>
    <p>{user.email}</p>
    <p>Direccion: {user.address}</p>
  </div>
);