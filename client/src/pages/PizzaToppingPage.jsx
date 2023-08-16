import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Button } from '@mui/material';

const PizzaToppingPage = () => {
  const [topping, setTopping] = useState([]);
  const token = getItemFromLocalStorage('token');

  const getToppingData = async () => {
    const { data } = await axios.get(`/pizzaTopping`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(data);
    setTopping(data);
  };

  useEffect(() => {
    getToppingData();
    console.log('Load index page');
  }, []);

  return (
    <div className='m-10 p-2'>
      <strong>PIZZA TOPPING</strong>
      <div className='productList'>
        <ul className='list-none flex flex-wrap justify-center'>
          {topping.length > 0 && topping.map((toppingItem) => (

            <li key={toppingItem._id} className='m-2 p-2'>

              <div className='product-list-container' key={toppingItem._id}>
                <div className='product-card'>
                  <img src={toppingItem.image} alt={toppingItem.name} />
                  <strong className='product-title'>Name: {toppingItem.name}</strong>
                  <p className='product-price'>Price: ${toppingItem.price}</p>
                  <Button variant="contained">Add to cart</Button>
                </div>
              </div>

            </li>

          ))}
        </ul>
      </div>
    </div>
  );

};

export default PizzaToppingPage;