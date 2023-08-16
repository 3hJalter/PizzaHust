import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const SideDishPage = () => {
  const {id} = useParams();
  const token = getItemFromLocalStorage('token');
  const [sideDish, setSideDish] = useState([]);
  const [sideDishType, setSideDishType] = useState([]);

  const getSideDish = async (id) => {
    try {
      const response = await axios.get(`/sideDish/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSideDish(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getSideDishType = async (type_id) => {
    try {
      const response = await axios.get(`/sideDishType/${type_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSideDishType(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getSideDish(id);
    }
    
    if (sideDish && sideDish.sideDishTypeId) {
      getSideDishType(sideDish.sideDishTypeId);
    }
  }, [id, sideDish]);

  const addToCart = async () => {
    try {
      const response = await axios.patch('/cart/add-product', 
      {
        type: "side dish",
        productId: sideDish._id,
        name: sideDish.name,
        price: sideDish.price,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Side dish added to cart:', response.data);
      // Update UI, show success message, etc.

    } catch (error) {
      console.error('Error adding side dish to cart:', error.response.data);
      // Handle error, show error message, etc.
    }
  };  

  return (
    <div className="mt-8 grid">
      <div className="grid grid-cols-5 mx-12 space-x-4 my-10">
        <div className="col-span-2 flex justify-center bg-white p-2 rounded-xl">
          <img
            src={sideDish.image}
            alt={name}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="col-span-3 bg-white p-2 rounded-xl space-y-3">
          <div className="text-2xl font-bold mb-2">
            {sideDish.name}
          </div>

          <div className="text-xl font-bold text-red-600">
            Cost: ${sideDish.price}
          </div>

          <div>
            Side dish type: {sideDishType.name}
          </div>

          <div>
            Description: {sideDish.description}
          </div>

          <Button variant="contained" onClick={addToCart}>Add to card</Button>
        </div>

      </div>


      <div className="bg-slate-300 grid mx-12 space-x-4 rounded-xl p-4 py-4">
        {sideDish.description}
      </div>
    </div>
  );
};

export default SideDishPage;