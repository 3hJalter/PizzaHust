import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';

export default function AdminVouchers() {
  const token = getItemFromLocalStorage('token');
  const getVoucherData = async () => {
    const { data } = await axios.get(`/voucher`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  }

  getVoucherData().then(() => {});

  return (
    <>
      <div>This is Admin Vouchers</div>
    </>
  );
}