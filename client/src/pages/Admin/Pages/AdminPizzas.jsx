import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';

export default function AdminPizzas() {
  const token = getItemFromLocalStorage('token');
  const getPizzaData = async () => {
    const { data } = await axios.get(`/pizza`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  }

  getPizzaData().then(() => {});

  return (
    <>
      <div>This is Admin Pizzas</div>
    </>
  );
}