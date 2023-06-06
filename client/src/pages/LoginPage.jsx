import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../providers/UserProvider';
import { setItemsInLocalStorage } from '../utils';
import ProfilePage from './ProfilePage';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectAdmin, setRedirectAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  let isCustomer = true;
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    isCustomer = username !== 'admin';
    console.log('isCustomer', isCustomer);
    try {
      const { data } = await axios.post('user/login', { username, password, isCustomer });
      setItemsInLocalStorage('token', data.token);
      setUser(data.user);

      toast.success('Login successfully!');
      if (isCustomer) setRedirect(true);
      else setRedirectAdmin(true);
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
      } else if (err.request) {
        toast.error(err.request);
      } else {
        console.error('Error: ', err.message);
      }
    }
  };

  if (redirect) {
      return <Navigate to={'/'} />;
  }

  if (redirectAdmin) {
    return <Navigate to={'/admin'} />;
  }

  if (user) {
    return <ProfilePage />;
  }

  return (
    <div className="mt-4 grow flex justify-around items-center">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
          <input
            id='username'
            type="text"
            placeholder="your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id='password'
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary hover:bg-red-700 transition mt-2">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link className="text-black underline" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
