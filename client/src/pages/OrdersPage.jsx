import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { getItemFromLocalStorage } from '../utils';
import Spinner from '../components/Spinner';
import OrderCard from '../components/OrderCard.jsx';
import AddIcon from '@mui/icons-material/Add';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getItemFromLocalStorage('token');
    const getOrders = async () => {
      try {
        const { data } = await axios.get('orders/user-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      {/* flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:scale-105 transition transform duration-200 ease-out */}
      <div className="text-center hover:scale-110 transition transform duration-200 ease-out">
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/account/orders/new'}
        >
          <AddIcon />
          Add new order
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap">
        {orders.length > 0 &&
          orders.map((order) => (
            <div className="sm:w-1/2 md:w-1/3 lg:w-1/4" key={order._id}>
              <OrderCard order={order} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersPage;
