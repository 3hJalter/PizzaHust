import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminSideDishes() {
  const token = getItemFromLocalStorage('token');
  const [sideDish, SetSideDish] = useState([]);
  const getSideDishData = async () => {
    const { data } = await axios.get(`/sideDish`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    SetSideDish(data.sideDishes);
  }

  useEffect(() => {
    getSideDishData().then(() => {});
  }, []);


  return (
    <>
      <div>This is Admin SideDishes</div>
      <div>
        <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {sideDish.length > 0 && sideDish.map((sideDishItem) => (
            <div key={sideDishItem._id}>
              <Link to={`/admin/sideDishes/${sideDishItem._id}`} >
                <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                  Need to set image
                </div>
                <div>
                  <h2 className='font-bold'>{sideDishItem.image}</h2>
                  Name: <h3 className='text-sm text-gray-500 '>{sideDishItem.name}</h3>
                </div>
                <div>
                  Price: <span className='font-semibold'>${sideDishItem.price} </span>
                </div>
                <div> <h3 className='text-sm text-gray-500 '>{sideDishItem.description}</h3> </div>
              </Link>
            </div>
          ))}
          <Link to={'/admin/sideDishes/new'} className="primary hover:bg-secondary transition my-4">
            Add new sideDish
          </Link>
        </div>
      </div>
    </>
  );
}