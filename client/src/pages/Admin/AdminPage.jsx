import { Link } from 'react-router-dom';

export default function AdminPage() {
  return (
    <>
      <div>TESTING</div>
      <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
            to={'/Orders'}>Orders</Link>
      <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
            to={'/Combos'}>Combos</Link>
      <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
            to={'/Pizzas'}>Pizzas</Link>
      <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
            to={'/PizzaToppings'}>PizzaToppings</Link>
      <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
            to={'/SideDishes'}>SideDishes</Link>
      <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
            to={'/Vouchers'}>Vouchers</Link>
      <Link className="inline-flex gap-1 bg-primary hover:bg-red-700 transition mb-5 text-white py-2 px-6 rounded-full"
            to={'/Users'}>Users</Link>
    </>
  )
}