import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';

export default function AdminPizzaToppings() {
  const token = getItemFromLocalStorage('token');
  const getPizzaToppingData = async () => {
    const { data } = await axios.get(`/pizzaTopping`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  }

  getPizzaToppingData().then(() => {});

  return (
    <>
      <div>This is Admin PizzaToppings</div>
    </>
  );
}