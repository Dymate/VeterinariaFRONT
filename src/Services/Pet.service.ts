import axios from 'axios';
import { useEffect, useState } from 'react';
import { BehaviorSubject, Subscription } from 'rxjs';
import { endpoint } from '../contants';
import { Pet, User } from '../Models';

const petState = new BehaviorSubject<Pet[]>([]);

const usePetState = () => {
  const [pets, setPets] = useState<Pet[]>(petState.value);

  useEffect(() => {
    const subsciption: Subscription = petState.asObservable().subscribe((_pets) => {
      setPets(_pets);
    });

    return () => subsciption.unsubscribe();
  }, []);

  return pets;
};

const getPets = async (user: User) => {
  const pets = await axios.get(`${endpoint}/users/${user.id}/pets`, { headers: { Authorization: `Bearer ${user.token}`}});

  petState.next(pets.data);
};

export {
  usePetState,
  getPets,
};