import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';

export default function AdminPizzaTypes() {
  const token = getItemFromLocalStorage('token');
  const getPizzaTypeData = async () => {
    const { data } = await axios.get(`/pizzaType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  }

  getPizzaTypeData().then(() => {});

  return (
    <>
      <div>This is Admin PizzaTypes</div>
    </>
  );
}