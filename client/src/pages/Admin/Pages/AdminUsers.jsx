import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';

export default function AdminUsers() {
  const token = getItemFromLocalStorage('token');
  const getUserData = async () => {
    const { data } = await axios.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  }

  getUserData().then(() => {});

  return (
    <>
      <div>This is Admin Users</div>
    </>
  );
}