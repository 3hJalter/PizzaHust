import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPizzaToppings() {
  const token = getItemFromLocalStorage('token');
  const [pizzaTopping, setPizzaTopping] = useState([]);
  const getPizzaToppingData = async () => {
    const { data } = await axios.get(`/pizzaTopping`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPizzaTopping(data.toppings);
  }

  useEffect(() => {
    getPizzaToppingData().then(() => {});
  }, []);

  const removePizzaTopping = async (id) => {
    console.log('id: ' + id)
    try {
      await axios.delete(`/pizzaTopping/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPizzaTopping(pizzaTopping.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <div>This is Admin PizzaToppings</div>
      <div>
        <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {pizzaTopping.length > 0 && pizzaTopping.map((pizzaToppingItem) => (
            <div key={pizzaToppingItem._id}>
              <Link to={`/admin/pizzaToppings/${pizzaToppingItem._id}`} >
                <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                  Need to set image
                </div>
                <div>
                  <h2 className='font-bold'>{pizzaToppingItem.image}</h2>
                  <h3 className='text-sm text-gray-500 '>{pizzaToppingItem.name}</h3>
                </div>
                <div>
                  <span className='font-semibold'>${pizzaToppingItem.price} </span>
                  discount
                </div>
              </Link>
              <button className='primary hover:bg-secondary transition my-4'
                      onClick={() => {
                        removePizzaTopping(pizzaToppingItem._id).then(() => {
                        });
                      }}>
                Remove
              </button>
            </div>
            
          ))}
          <Link to={'/admin/pizzaToppings/new'} className="primary hover:bg-secondary transition my-4">
            Add new pizzaTopping
          </Link>
        </div>
      </div>
    </>
  );
}