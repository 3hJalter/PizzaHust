<<<<<<< Updated upstream
import React, { useContext, useEffect } from 'react';
import ShowProduct from '../components/ShowProduct';

const DetailPage = () => {

    return (
        <div className="mt-8 grid">
            <ShowProduct
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg"
                name="Product Name Goes Here"
                cost={150}
                description="Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea Nonumy"
            />

        </div>
    );
=======
import React, { useContext, useEffect, useState } from 'react';
import ShowProduct from '../components/ShowProduct';
import ShowDes from '../components/ShowDes';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Link } from 'react-router-dom';

const DetailPage = ({ id, type_id }) => {
  const token = getItemFromLocalStorage('token');
  const [pizza, setPizza] = useState([]);
  const [pizzaType, setPizzaType] = useState([]);

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

  const getPizzaType = async (type_id) => {
    try {
      const response = await axios.get(`/pizzaType/${type_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { pizzaType } = response.data;

      if (!pizzaType) {
        throw new Error('Pizza type not found');
      }

      console.log(pizzaType);
      setPizzaType(pizzaType);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPizzaData(id);
    getPizzaType(type_id);
  }, [id]);

  return (
    <div className="mt-8 grid">
      {pizza ? (
        <>
          <ShowProduct 
            image={pizza.image} 
            name={pizza.name} 
            cost={pizza.price} 
            description={pizza.description}
            pizzaType={pizzaType ? pizzaType.name : ''}
          />


          <ShowDes 
            description={pizza.description}
          />

        </>
        ) : (
          <p>Loading pizza details...</p>
        )}
    </div>
  );
>>>>>>> Stashed changes
};

export default DetailPage;
