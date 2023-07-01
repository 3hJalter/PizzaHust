import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import RadioButton from '../components/RadioButton';

const ComboPage = ({ id }) => {
  const token = getItemFromLocalStorage('token');
  const [combo, setCombo] = useState([]);
  const [pizza, setPizza] = useState([]);
  
  const getCombo = async (id) => {
    try {
      const response = await axios.get(`/combo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { combo } = response.data;

      if (!combo) {
        throw new Error('Pizza not found');
      }

      console.log(combo);
      setCombo(combo);
      // Handle the pizza data here
    } catch (error) {
      console.error(error);
    }
  }

  const getPizzaData = async (id) => {
    try {
      const response = await axios.get(`/pizza/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { pizza } = response.data;

      if (!pizza) {
        throw new Error('Pizza not found');
      }

      console.log(pizza);
      setPizza(pizza);
      // Handle the pizza data here
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCombo(id);
    if (combo && combo.pizzaListId) {
      combo.pizzaListId.forEach((pizzaId) => {
        getPizzaData(pizzaId);
      });
    }
  }, [id]);

  return (
    <div className="mt-8 grid">
      <div className="grid grid-cols-5 mx-12 space-x-4 my-10">
        <div className="col-span-2 flex justify-center bg-white p-2 rounded-xl">
          
        </div>

        <div className="col-span-3 bg-white p-2 rounded-xl space-y-3">
          <div className="text-2xl font-bold mb-2">
            {combo.name}
          </div>

          <div className="text-xl font-bold text-red-600">
            Cost: ${combo.price}
          </div>

          <div>
            Discount: {combo.discount}
          </div>

          <div>
            Description: {combo.description}
          </div>

          <div>
            Pizza: {pizza.name}
          </div>

          <div>
            Side Dish: {combo.sideDishListId}
          </div>

          <Button variant="contained">Add to card</Button>
        </div>

      </div>


      <div className="bg-slate-300 grid mx-12 space-x-4 rounded-xl p-4 py-4">
        {combo.description}
      </div>
    </div>

  );
};

export default ComboPage;