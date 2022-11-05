import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pet } from '../../Models';
import { usePetState } from '../../Services';
import './PetResume.css';

export const PetResume: React.FC = () => {
  const [pet, setPet] = useState<Pet>({} as Pet);
  const [picture, setPicture] = useState<string>('');
  const { id } = useParams();
  const navigate = useNavigate();
  const pets = usePetState();

  const petMap: { [key: string]: Pet } = useMemo(() => pets
    .reduce((acc, _pet: Pet) => ({ ...acc, [_pet.id ?? _pet.name]: _pet }), {}), [pets]);

  useEffect(() => {
    fetch('https://cataas.com/cat/says/hi?size=50&color=red')
      .then(response => response.blob())
      .then(img => setPicture(URL.createObjectURL(img)));
  }, []);

  useEffect(() => {
    setPet(petMap[id ?? '']);
  }, [petMap, id]);

  return (
    <div className='pet-info-container'>
      <div className='pet-info-title'>
        <h1>Datos de la mascota</h1>
      </div>
      <hr />
      <div className='pet-info-data-container'>
        <div className='pet-info-data-detail'>
          <div> <span className='prefix'>Nombre: </span> {pet.name} </div>
          <div> <span className='prefix'>Edad: </span> {pet.age} </div>
          <div> <span className='prefix'>Sexo: </span> {pet.genre} </div>
          <div> <span className='prefix'>Peso: </span> {pet.weigth} </div>
          <div> <span className='prefix'>Especie: </span> {pet.species} </div>
          <div> <span className='prefix'>Raza: </span> {pet.race} </div>
          <div> <span className='prefix'>Color: </span> {pet.color} </div>
          <div> <span className='prefix'>Fecha de nacimiento: </span> {pet.date} </div>
          <div> <span className='prefix'>Esta esterilizada?: </span> {pet.sterilized ? 'Y' : 'N'} </div>
          <div> <span className='prefix'>Descripcion: </span> {pet.description} </div>
          <hr />
          <button onClick={() => navigate(-1)}>Regresar</button>
        </div>
        <div className='pet-info-data-photo'>
          <img src={picture} alt='pet-image' />
        </div>
      </div>
    </div>
  );
};