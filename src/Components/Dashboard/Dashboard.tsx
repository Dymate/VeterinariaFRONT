import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const actions = useMemo(() => [
    {
      name: 'Ver perfil',
      action: () => navigate('/profile')
    }
  ], [navigate]);

  return (
    <div className='dashboard'>
      <div className='title'>
        <h2>Bienvenido {user.email}</h2>
        <h3>Dashboard</h3>
      </div>
      <hr></hr>
      <div className='actions-container'>
        <h3 className='actions-title'>Acciones</h3>
        <div className='actions-group'>
          {actions.map((action, i) => (
            <div
              key={`action_${i}`}
              onClick={action.action}
              className='action-button'>
              {action.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};