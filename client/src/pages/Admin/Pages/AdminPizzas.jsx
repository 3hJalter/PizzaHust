import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPizzas() {
  const token = getItemFromLocalStorage('token');
  const [pizza, setPizza] = useState([]);
  const [pizzaType, setPizzaType] = useState([]);
  const getPizzaData = async () => {
    const { data } = await axios.get(`/pizza`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPizza(data.pizzas)
  }

  const getPizzaTypeData = async () => {
    const { data } = await axios.get(`/pizzaType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data.types);
    setPizzaType(data.types)
  }

  const getPizzaTypeName = (pizzaTypeId) => {
    const pizzaTypeObj = pizzaType.find((type) => type._id === pizzaTypeId);
    return pizzaTypeObj ? pizzaTypeObj.name : '';
  };

  useEffect(() => {
    getPizzaData().then(
      () => {getPizzaTypeData().then(() => {})
    });
    console.log('Load index page');
  }, []);

  return (
    <>
      <div>This is Admin Pizzas</div>
      <div>
        <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {pizza.length > 0 && pizza.map((pizzaItem) => (
            <>
              <Link to={`/admin/pizzas/${pizzaItem._id}`} key={pizzaItem._id}>
                <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                  Need to set image
                </div>
                <div>
                  <h2 className='font-bold'>{pizzaItem.name}</h2>
                  <h3 className='text-sm text-gray-500 '>{pizzaItem.price}</h3>
                </div>
                <div>
                  Type:
                  <span className='font-semibold'>{getPizzaTypeName(pizzaItem.pizzaTypeId)} </span>
                </div>
              </Link>
            </>
          ))}
          <Link to={'/admin/pizzas/new'} className="primary hover:bg-secondary transition my-4">
            Add new pizza
          </Link>
        </div>
      </div>
    </>
  );
}