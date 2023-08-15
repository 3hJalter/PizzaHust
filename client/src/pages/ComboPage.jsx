import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const ComboPage = () => {
  const {id} = useParams();
  const token = getItemFromLocalStorage('token');
  const [combo, setCombo] = useState({});

  const [pizzaListId, setPizzaListId] = useState([]);
  const [pizzasData, setPizzasData] = useState({});
  const [pizzasQty, setPizzasQty] = useState({});
  
  const [sideDishListId, setSideDishListId] = useState([]);
  const [sideDishesData, setSideDishesData] = useState({});
  const [sideDishesQty, setSideDishesQty] = useState({});

  const getCombo = async (id) => {
    try {
      const response = await axios.get(`/combo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setCombo(response.data);

      const pizzaData = response.data.pizzaListId;
      const pizzaIds = pizzaData.map(pizza => pizza._id);
      setPizzaListId(pizzaIds);

      const pizzaQty = pizzaData.map(pizza => pizza.quantity);
      setPizzasQty(pizzaQty);

      const sideDishData = response.data.sideDishListId;
      const sideDishIds = sideDishData.map(sideDish => sideDish._id);
      setSideDishListId(sideDishIds);

      const sideDishQty = sideDishData.map(sideDish => sideDish.quantity);
      setSideDishesQty(sideDishQty);

    } catch (error) {
      console.error(error);
    }
  };

  const getPizzaData = async (id) => {
    try {
      const response = await axios.get(`/pizza/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the pizza data is already present in pizzasData
      if (!pizzasData[response.data._id]) {
        setPizzasData(prevPizzasData => ({
          ...prevPizzasData,
          [response.data._id]: response.data
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSideDishData = async (id) => {
    try {
      const response = await axios.get(`/sideDish/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the side dish data is already present in sideDishesData
      if (!sideDishesData[response.data._id]) {
        setSideDishesData(prevSideDishesData => ({
          ...prevSideDishesData,
          [response.data._id]: response.data
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCombo(id);
  }, [id]);

  useEffect(() => {
    pizzaListId.forEach(pizzaId => {
      getPizzaData(pizzaId);
    });
    sideDishListId.forEach(sideDishId => {
      getSideDishData(sideDishId);
    });
  }, [pizzaListId, sideDishListId]);

  return (
    <div className="mt-8 grid">
      <div className="grid grid-cols-5 mx-12 space-x-4 my-10">
        <div className="col-span-2 flex justify-center bg-white p-2 rounded-xl">
          <img src={combo.image}></img>
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
            <ul>
              {Object.values(pizzasData).map((pizzaData, index) => (
                <li key={pizzaData._id}>
                  Pizza {index + 1}: {pizzaData.name} - Quantities: {pizzasQty[index]}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul>
              {Object.values(sideDishesData).map((sideDishData, index) => (
                <li key={sideDishData._id}>
                  Side Dish {index + 1}: {sideDishData.name} - Quantities: {sideDishesQty[index]}
                </li>
              ))}
            </ul>
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
