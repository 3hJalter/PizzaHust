import { Link } from 'react-router-dom';

export default function AdminPage() {
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