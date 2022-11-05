import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../Components';
import { UserContext } from '../../Context';
import { useUserValidation } from '../../Services/Auth.service';
import './DashboardLayout.css';


export const DashboardLayout: React.FC = () => {
  const user = useUserValidation();

  return (
    <UserContext.Provider value={user}>
      <div className='dashboard-layout'>
        <Header user={user} />
        <div className='dashboard-content'>
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
};