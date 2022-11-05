import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../Services';
import crypto from 'crypto-js';
import * as Yup from 'yup';
import './Register.css';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const { handleSubmit, getFieldProps, isValid, errors, touched } = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      address: '',
      email: '',
      password: '',
      passwordRepeat: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre requerido'),
      lastname: Yup.string().required('Nombre requerido'),
      address: Yup.string().required('Direccion requerido'),
      email: Yup.string().email().required('Email requerido'),
      password: Yup.string().required('Contrasena requerida'),
      passwordRepeat: Yup.string().required('Contrasena requerida')
    }),
    onSubmit: async ({ password: pwd, passwordRepeat, ...obj }, { setFieldError }) => {
      if (pwd !== passwordRepeat) {
        setFieldError('passwordRepeat', 'Las contrasenas no son iguales');
        return;
      }
      const password = crypto.SHA256(pwd).toString();

      try {
        await signin({
          ...obj,
          password
        });

        navigate('/');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e?.message ?? '');
      }
    }
  });

  return (
    <div className='register-form'>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          id='name'
          type='name'
          placeholder='Nombre'
          {...getFieldProps('name')}
        />
        <input
          id='lastname'
          type='lastname'
          placeholder='Apellido'
          {...getFieldProps('lastname')}
        />
        <input
          id='address'
          type='address'
          placeholder='Direccion'
          {...getFieldProps('address')}
        />
        <input
          id='email'
          type='email'
          placeholder='Correo'
          {...getFieldProps('email')}
        />
        <input
          id='password'
          type='password'
          placeholder='Contrasena'
          {...getFieldProps('password')}
        />
        <input
          id='passwordRepeat'
          type='password'
          placeholder='Repita su contrasena'
          {...getFieldProps('passwordRepeat')}
        />
        <button type='submit' disabled={touched && !isValid}>Aceptar</button>
        {touched && errors && (
          Object.values(errors).map((_error: string, i: number) => (
            <div key={`error_${i}`} className='error'>
              {_error}
            </div>
          ))
        )}
        {error && <div className='error'>{error}</div>}
      </form>
      <div onClick={() => navigate('/login')} className='link'>Ingresar</div>
    </div>
  );
};