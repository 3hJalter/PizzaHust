import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';

export default function AdminOrders() {
  const token = getItemFromLocalStorage('token');
  const getOrderData = async () => {
    const { data } = await axios.get(`/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  }

  getOrderData().then(() => {});

  return (
    <>
        <div>This is Admin Orders</div>
    </>
  );
}