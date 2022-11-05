import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BehaviorSubject, Subscription } from 'rxjs';
import { endpoint } from '../contants';
import { User } from '../Models';
import axios from 'axios';

const userState = new BehaviorSubject<User>({} as User);

const isAuthenticated = (): boolean => {
  return Boolean(Object.keys(userState.value).length);
};

const useUserState = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const subsciption: Subscription = userState.asObservable().subscribe((_user) => {
      setUser(_user);
      navigate(isAuthenticated() ? '/' : '/login');
    });

    return () => subsciption.unsubscribe();
  }, []);

  return user;
};

const useUserValidation = () => {
  const user = useUserState();

  useEffect(() => {
    const userLS = localStorage.getItem('user');
    const isAuth = Boolean(userLS);

    if (!isAuth) {
      return;
    }

    const _user: User = JSON.parse(userLS ?? '{}');
    userState.next(_user);
  }, []);

  return user;
};

const logout = () => {
  userState.next({} as User);
  localStorage.removeItem('user');
};

const login = async (user: User) => {
  const response = await axios.post(`${endpoint}/users/login`, user);
  localStorage.setItem('user', JSON.stringify(response.data));
};

const signin = async (user: User) => {
  const response = await axios.post(`${endpoint}/users`, { ...user, confirmPassword: user.password });
  const _user = await axios.get(`${endpoint}/users/${response.data.id}`);
  localStorage.setItem('user', JSON.stringify(_user.data));
};

export {
  isAuthenticated,
  login,
  logout,
  signin,
  useUserState,
  useUserValidation
};