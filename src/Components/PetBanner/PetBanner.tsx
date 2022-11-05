import React, { useEffect, useState } from 'react';
import './PetBanner.css';

export const PetBanner: React.FC<{ name: string, onClick: () => void }> = ({ name, onClick }) => {
  const [picture, setPicture] = useState<string>('');

  useEffect(() => {
    fetch('https://cataas.com/cat/says/hi?size=50&color=red')
      .then(response => response.blob())
      .then(img => setPicture(URL.createObjectURL(img)));
  }, []);

  return (
    <div className='pet-banner-container'>
      <div className='pet-photo'>
        <img src={picture} alt='pet-photo' />
      </div>
      <div onClick={onClick} className='profile-call'>
        Perfil de {name}
      </div>
    </div>
  );
};