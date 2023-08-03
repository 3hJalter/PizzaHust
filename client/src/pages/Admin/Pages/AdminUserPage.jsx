import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

const AdminUserPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('Admin');

  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios.get(`/user/${id}`).then((response) => {
        const { user } = response.data;
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
        setImage(user.image);
        setPhone(user.phone);
        setBirth(user.birth);
        setAddress(user.address);
        setDescription(user.description);
        setRole(user.role);
      });
    }
    setLoading(false);
    setDataFetched(true);
  }, [id]);

  const saveUser = async (e) => {
    e.preventDefault();
    const token = getItemFromLocalStorage('token');
    let userData = {
      name,
      username,
      email,
      password,
      image,
      phone,
      birth,
      address,
      description,
      role,
    };
    if (id) {
      userData = { id, ...userData };
      // update existing user
      const { data } = await axios.put(
        `/user/${id}`,
        { user: userData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    } else {
      // new user
      const { data } = await axios.post(
        '/user/register',
        { userData: userData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    }
    console.log('Done saving');
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/admin/users'} />;
  }

  if (loading || !dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Go to user with id = {id}</div>
      <div className='mx-8'>
        <h2 className='text-2xl mt-4'>Name</h2>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name'
        />

        <h2 className='text-2xl mt-4'>Username</h2>
        <input
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='username'
        />

        <h2 className='text-2xl mt-4'>Email</h2>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
        />

        <h2 className='text-2xl mt-4'>Password</h2>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />

        <h2 className='text-2xl mt-4'>Image</h2>
        <input
          id='image'
          type='text'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='image link'
        />

        <h2 className='text-2xl mt-4'>Phone</h2>
        <input
          id='phone'
          type='text'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='phone'
        />

        <h2 className='text-2xl mt-4'>Birth</h2>
        <input
          id='birth'
          type='datetime-local'
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          placeholder='birth'
        />

        <h2 className='text-2xl mt-4'>Address</h2>
        <input
          id='address'
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='address'
        />

        <h2 className='text-2xl mt-4'>Description</h2>
        <textarea
          id='description'
          rows='4'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='description'
        ></textarea>

        <h2 className='text-2xl mt-4'>Role</h2>
        <select id='role' value={role} onChange={(e) => setRole(e.target.value)}>
          <option value='admin'>Admin</option>
          <option value='user'>User</option>
        </select>

        <button
          className='primary hover:bg-secondary transition my-4'
          onClick={(e) => {
            saveUser(e).then(() => {});
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminUserPage;
