import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import PizzaToppingPage from './PizzaToppingPage.jsx';

const PizzaPage = () => {
  const {id} = useParams();
  const token = getItemFromLocalStorage('token');
  const [pizza, setPizza] = useState([]);
  const [pizzaType, setPizzaType] = useState([]);
  const [pizzaSize, setPizzaSize] = useState([]);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState({
    name: "S",
    priceMultiple: 1
  });

  const handlePizzaSizeChange = (event) => {
    const selectedSize = pizzaSize.find(size => size.name === event.target.value);
    setSelectedPizzaSize({
      name: selectedSize.name,
      priceMultiple: selectedSize.priceMultiple
    });
  };

  const getPizzaSizeData = async () => {
    try {
      const { data } = await axios.get(`/pizzaSize`);
      setPizzaSize(data);

    } catch (error) {
      console.error(error);
    }
  };

  const getPizzaData = async (id) => {
    try {
      const response = await axios.get(`/pizza/${id}`);
      setPizza(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const getPizzaType = async (type_id) => {
    try {
      const response = await axios.get(`/pizzaType/${type_id}`);
      console.log(response.data);
      setPizzaType(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("2Pizza");
        await getPizzaData(id);
        console.log("1Pizza");

        console.log("0Pizza");
        await getPizzaSizeData();
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pizza && pizza.pizzaTypeId) {
      const fetchPizzaType = async () => {
        try {
          console.log("Fetching Pizza Type");
          await getPizzaType(pizza.pizzaTypeId);
        } catch (error) {
          console.error("Error fetching Pizza Type:", error);
        }
      };

      fetchPizzaType();
    }
  }, [pizza]); // Listen for changes in the pizza state

  const addToCart = async () => {
    try {
      const response = await axios.patch('/cart/add-product', 
      {
        type: "pizza",
        productId: pizza._id,
        name: pizza.name + "With size " + selectedPizzaSize.name,
        price: pizza.price * selectedPizzaSize.priceMultiple,
        quantity: 1,
        size: selectedPizzaSize,
        toppingList: [],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Pizza added to cart:', response.data);
      // Update UI, show success message, etc.

    } catch (error) {
      console.error('Error adding pizza to cart:', error.response.data);
      // Handle error, show error message, etc.
    }
  };  

  return (
    <div className="mt-8 grid">
      <div className="grid grid-cols-5 mx-12 space-x-4 my-10">
        <div className="col-span-2 flex justify-center bg-white p-2 rounded-xl">
          <img
            src={pizza.image}
            alt={name}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="col-span-3 bg-white p-2 rounded-xl space-y-3">
          <div className="text-2xl font-bold mb-2">
            {pizza.name}
          </div>

          <div className="text-xl font-bold text-red-600">
            Cost: ${pizza.price * selectedPizzaSize.priceMultiple}
          </div>

          <div>
            Pizza type: {pizzaType.name}
          </div>

          <div>
            Description: {pizza.description}
          </div>
          <div>
            <select value={selectedPizzaSize.name} onChange={handlePizzaSizeChange}>
              {pizzaSize.map(size => (
                <option key={size.id} value={size.name}>
                  {size.name}
                </option>
              ))}
            </select>
            <p>Selected Pizza Size: {selectedPizzaSize.name}</p>
            <p>Price Multiple: {selectedPizzaSize.priceMultiple}</p>
          </div>
          <Button variant="contained" onClick={addToCart}>Add to card</Button>
        </div>

      </div>


      <div className="bg-slate-300 grid mx-12 space-x-4 rounded-xl p-4 py-4">
        {pizza.description}
      </div>

      <PizzaToppingPage />
    </div>
  );
};

export default PizzaPage;
