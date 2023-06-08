import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPizzaTypes() {
  const token = getItemFromLocalStorage('token');
  const [pizzaType, setPizzaType] = useState([]);
  const getPizzaTypeData = async () => {
    const { data } = await axios.get(`/pizzaType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPizzaType(data.types);
  }

  useEffect(() => {
    getPizzaTypeData().then(() => {});
  }, []);

  const removePizzaType = async (id) => {
    console.log('id: ' + id)
    try {
      await axios.delete(`/pizzaType/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPizzaType(pizzaType.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <div>This is Admin PizzaTypes</div>
      <div>
        <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {pizzaType.length > 0 && pizzaType.map((pizzaTypeItem) => (
            <div key={pizzaTypeItem._id}>
              <Link to={`/admin/pizzaTypes/${pizzaTypeItem._id}`} >
                <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                  Need to set image
                </div>
                <div>
                  <h2 className='font-bold'>{pizzaTypeItem.image}</h2>
                  Name: <h3 className='text-sm text-gray-500 '>{pizzaTypeItem.name}</h3>
                </div>
                <div>
                  Description: <br/>
                  <span className='font-semibold'>${pizzaTypeItem.description} </span>
                </div>
              </Link>
              <button className='primary hover:bg-secondary transition my-4'
                      onClick={() => {
                        removePizzaType(pizzaTypeItem._id).then(() => {
                        });
                      }}>
                Remove
              </button>
            </div>
          ))}
          <Link to={'/admin/pizzaTypes/new'} className="primary hover:bg-secondary transition my-4">
            Add new pizzaType
          </Link>
        </div>
      </div>
    </>
  );
}