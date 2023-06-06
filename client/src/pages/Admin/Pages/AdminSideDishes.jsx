import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';

export default function AdminSideDishes() {
  const token = getItemFromLocalStorage('token');
  const getSideDishData = async () => {
    const { data } = await axios.get(`/sideDish`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  }

  getSideDishData().then(() => {});

  return (
    <>
      <div>This is Admin SideDishes</div>
    </>
  );
}