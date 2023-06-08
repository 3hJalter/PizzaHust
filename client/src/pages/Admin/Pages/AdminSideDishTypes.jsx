import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminSideDishTypes() {
  const token = getItemFromLocalStorage('token');
  const [sideDishType, setSideDishType] = useState([]);
  const getSideDishTypeData = async () => {
    const { data } = await axios.get(`/sideDishType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setSideDishType(data.types);
  }

  useEffect(() => {
    getSideDishTypeData().then(() => {});
  }, []);

  const removeSideDishType = async (id) => {
    console.log('id: ' + id)
    try {
      await axios.delete(`/sideDishType/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSideDishType(sideDishType.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <div>This is Admin SideDishTypes</div>
      <div>
        <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {sideDishType.length > 0 && sideDishType.map((sideDishTypeItem) => (
            <div key={sideDishTypeItem._id}>
              <Link to={`/admin/sideDishTypes/${sideDishTypeItem._id}`} >
                <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                  Need to set image
                </div>
                <div>
                  <h2 className='font-bold'>{sideDishTypeItem.image}</h2>
                  Name: <h3 className='text-sm text-gray-500 '>{sideDishTypeItem.name}</h3>
                </div>
                <div>
                  Description: <br/>
                  <span className='font-semibold'>${sideDishTypeItem.description} </span>
                </div>
              </Link>
              <button className='primary hover:bg-secondary transition my-4'
                      onClick={() => {
                        removeSideDishType(sideDishTypeItem._id).then(() => {
                        });
                      }}>
                Remove
              </button>
            </div>
          ))}
          <Link to={'/admin/sideDishTypes/new'} className="primary hover:bg-secondary transition my-4">
            Add new sideDishType
          </Link>
        </div>
      </div>
    </>
  );
}