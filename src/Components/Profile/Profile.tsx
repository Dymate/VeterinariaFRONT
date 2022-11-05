import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';
import { Pet } from '../../Models';
import { getPets, usePetState } from '../../Services';
import { PetBanner } from '../PetBanner';
import { UserInfo } from '../UserInfo';
import './Profile.css';

export const Profile: React.FC = () => {
  const pets = usePetState();
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getPets(user);
  }, [user]);

  return (
    <div className='profile-container'>
      <div className='user-data'>
        <UserInfo user={user} />
      </div>
      <div className='pets-container'>
        {pets.map((pet: Pet) => (
          <PetBanner
            key={pet.id}
            name={pet.name}
            onClick={() => navigate(`/pet/${pet.id}`)}
          />
        ))}
      </div>
    </div>
  );
};