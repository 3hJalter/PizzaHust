import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminUsers() {
  const token = getItemFromLocalStorage('token');
  const [user, SetUser] = useState([]);
  const getUserData = async () => {
    const { data } = await axios.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    SetUser(data.users);
  }

  useEffect(() => {
    getUserData().then(() => {});
  }, []);


  return (
    <>
      <div>This is Admin Users</div>
      <div>
        <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {user.length > 0 && user.map((userItem) => (
            <div key={userItem._id}>
              <Link to={`/admin/users/${userItem._id}`} >
                <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                  Need to set image
                </div>
                <div>
                  <h2 className='font-bold'>{userItem.image}</h2>
                  Username: <span className='text-sm text-gray-500 '>{userItem.username}</span> <br/>
                  Name: <span className='text-sm text-gray-500 '>{userItem.name}</span> <br/>
                  Address: <span className='text-sm text-gray-500 '>{userItem.address}</span> <br/>
                  Birth: <span className='text-sm text-gray-500 '>{userItem.birth}</span> <br/>
                  Email: <span className='text-sm text-gray-500 '>{userItem.email}</span> <br/>
                  Phone: <span className='text-sm text-gray-500 '>{userItem.phone}</span> <br/>
                  Role: <span className='text-sm text-gray-500 '>{userItem.role}</span> <br/>
                </div>
                <div>
                  Description: <br/>
                  <span className='font-semibold'>{userItem.description} </span>
                </div>
              </Link>
            </div>
          ))}
          <Link to={'/admin/users/new'} className="primary hover:bg-secondary transition my-4">
            Add new user
          </Link>
        </div>
      </div>
    </>
  );
}