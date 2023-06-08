import { Link, Navigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../providers/UserProvider.jsx';

export default function AdminPage() {
  const {user, setUser} = useContext(UserContext)
  if (user && user.role === 'Customer') {
    console.log('check')
    return <Navigate to={'/'} />;
  }

  if (user && user.role === 'Admin') {
    return (
      <>
        <div>TESTING</div>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/orders'}>Orders</Link>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/combos'}>Combos</Link>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/pizzas'}>Pizzas</Link>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/pizzaToppings'}>PizzaToppings</Link>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/pizzaTypes'}>PizzaTypes</Link>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/sideDishes'}>SideDishes</Link>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/sideDishTypes'}>SideDishTypes</Link>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/vouchers'}>Vouchers</Link>
        <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
              to={'/admin/users'}>Users</Link>
      </>
    )
  }

    return (
      <></>
    )
}