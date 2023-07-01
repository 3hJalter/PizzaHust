import React, { useContext, useEffect, useState } from 'react';
import ShowProduct from '../components/ShowProduct';
import ShowDes from '../components/ShowDes';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Link } from 'react-router-dom';

const TestPage = ({ id }) => {
  const token = getItemFromLocalStorage('token');
  const [pizza, setPizza] = useState([]);

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
      console.log(pizza);
      // Handle the pizza data here
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    getPizzaData(id);
  }, [id]);

  return (
    <div>
      {pizza ? (
        <div>
          <h2>{pizza.pizzaSize}</h2>
          <p>Price: {pizza.price}</p>
          <p>Description: {pizza.description}</p>
          <p>PizzaType: {pizza.pizzaTypeId}</p>

        </div>
      ) : (
        <p>Loading pizza details...</p>
      )}
    </div>
  );
};

export default TestPage;
