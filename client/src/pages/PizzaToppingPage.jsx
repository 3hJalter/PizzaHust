import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Button } from '@mui/material';

const PizzaToppingPage = ({ id }) => {
  const token = getItemFromLocalStorage('token');
  const [topping, setTopping] = useState([]);

  const getTopping = async (id) => {
    try {
      const response = await axios.get(`/pizzaTopping/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTopping(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTopping(id);
  }, [id]);

  return (
    <div className="mt-8 grid">
      <div className="grid grid-cols-5 mx-12 space-x-4 my-10">
        <div className="col-span-2 flex justify-center bg-white p-2 rounded-xl">
          <img
            src={topping.image}
            alt={name}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="col-span-3 bg-white p-2 rounded-xl space-y-3">
          <div className="text-2xl font-bold mb-2">
            {topping.name}
          </div>

          <div className="text-xl font-bold text-red-600">
            Cost: ${topping.price}
          </div>

          <Button variant="contained">Add to card</Button>
        </div>

      </div>

      <div className="bg-slate-300 grid mx-12 space-x-4 rounded-xl p-4 py-4">
        {topping.name}
      </div>

    </div>
  );
};

export default PizzaToppingPage;