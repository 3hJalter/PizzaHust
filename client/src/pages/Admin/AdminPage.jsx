import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider.jsx';

export default function AdminPage() {
  const { user, setUser } = useContext(UserContext);

  if (user && user.role === 'Customer') {
    console.log('check');
    return <Navigate to={'/'} />;
  }

  if (user && user.role === 'Admin') {
    return (
      <>
        <div>TESTING</div>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/orders'}
        >
          Orders
        </Link>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/combos'}
        >
          Combos
        </Link>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/pizzas'}
        >
          Pizzas
        </Link>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/pizzaToppings'}
        >
          Pizza Toppings
        </Link>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/pizzaTypes'}
        >
          Pizza Types
        </Link>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/sideDishes'}
        >
          Side Dishes
        </Link>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/sideDishTypes'}
        >
          Side Dish Types
        </Link>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/vouchers'}
        >
          Vouchers
        </Link>
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
          to={'/admin/users'}
        >
          Users
        </Link>
      </>
    );
  }

  return <></>;
}
