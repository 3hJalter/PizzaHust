import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import OrderImg from './OrderImg.jsx';
import { getItemFromLocalStorage } from '../utils/index.js';

const OrderCard = ({ order }) => {
  const [deleted, setDeleted] = useState(false); // Declare state variable and function
  const navigate = useNavigate();
  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${getItemFromLocalStorage('token')}`,
        },
      });
      setDeleted(true); // Update state after succesful deletion
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (event) => {
    try {
      event.stopPropagation();
      await deleteOrder(order._id);
      event.preventDefault();
    } catch (err) {
      console.error(err);
      alert('Failed to delete order'); // Display an error message to the user
    }
  };

  const handleUpdate = () => {
    navigate(`/account/orders/${order._id}`);
  };

  if (!order || deleted) {
    // Check if order is deleted before rendering
    return null;
  }

  return (
    <>
      <div className="m-4">
        <div className="flex flex-col ml-2">
          <h2 className="text-xl">{order.title}</h2>
          <p className="text-sm my-3">{order.description}</p>
        </div>
        <div className="flex">
          <OrderImg order={order} />
        </div>

        <div className="flex mt-4 items-center justify-center">
          <button
            className="bg-primary rounded-2xl text-white hover:scale-110 hover:bg-red-700 transition w-1/3 p-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <div className="mx-4"></div>
          <button
            className="bg-primary rounded-2xl text-white hover:scale-110 hover:bg-red-700 transition w-1/3 p-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
