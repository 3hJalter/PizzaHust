import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';

export default function AdminSideDishTypes() {
  const token = getItemFromLocalStorage('token');
  const getSideDishTypeData = async () => {
    const { data } = await axios.get(`/sideDishType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  }

  getSideDishTypeData().then(() => {});

  return (
    <>
      <div>This is Admin SideDishTypes</div>
    </>
  );
}