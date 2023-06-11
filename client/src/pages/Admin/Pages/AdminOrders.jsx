import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminOrders() {
  const token = getItemFromLocalStorage('token');
  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    const { data } = await axios.get(`/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setOrder(data.orders)
  }

  useEffect(() => {
    getOrderData().then(() => {
    });
    console.log('Load index page');
  }, []);

  return (
    <>
      <div>This is Admin Orders</div>
      <div>
        <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {order.length > 0 && order.map((orderItem) => (
            <div key={orderItem._id}>
              <Link to={`/admin/orders/${orderItem._id}`} >
                <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                  Need to set image
                </div>
                <div>
                  <h2 className='font-bold'>{orderItem.orderStatus}</h2>
                  <h3 className='text-sm text-gray-500 '>{orderItem.price}</h3>
                </div>
                <div>
                  <span className='font-semibold'>${orderItem.discount} </span>
                  discount
                </div>
              </Link>
            </div>
          ))}
          <Link to={'/admin/orders/new'} className="primary hover:bg-secondary transition my-4">
            Add new order
          </Link>
        </div>
      </div>
    </>
  );
}