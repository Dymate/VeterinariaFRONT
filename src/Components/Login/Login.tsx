import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services';
import { User } from '../../Models';
import crypto from 'crypto-js';
import * as Yup from 'yup';
import './Login.css';

export const Login: React.FC = () => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { handleSubmit, getFieldProps, isValid, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email requerido'),
      password: Yup.string().required('Contrasena requerida')
    }),
    onSubmit: async ({ email, password: pwd }) => {
      const password = crypto.SHA256(pwd).toString();
      try {
        await login({
          email,
          password
        } as User);
        navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e?.message ?? 'Failed');
      }
    }
  });

  return (
    <div className='login-form'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          id='email'
          type='email'
          placeholder='Email'
          {...getFieldProps('email')}
        />
        <input
          id='password'
          type='password'
          placeholder='Contrasena'
          {...getFieldProps('password')}
        />
        <button type='submit' disabled={touched && !isValid}>Aceptar</button>
        {touched && errors && (
          Object.values(errors).map((_error, i) => (
            <div key={`error_${i}`} className='error'>
              {_error}
            </div>
          ))
        )}
        {error && <div className='error'>{error}</div>}
      </form>
      <div onClick={() => navigate('/registro')} className='link'>Registro</div>
    </div>
  );
};