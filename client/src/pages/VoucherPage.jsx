import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/index.js';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const VoucherPage = () => {
  const {id} = useParams();
  const token = getItemFromLocalStorage('token');
  const [voucher, setVoucher] = useState([]);

  const getVoucher = async (id) => {
    try {
      const response = await axios.get(`/voucher/${id}`);
      setVoucher(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getVoucher(id);
  }, [id]);

  return (
    <div className="mt-8 grid">
      <div className="grid grid-cols-6 mx-12 space-x-6 my-10">
        <div className="col-span-2 flex justify-center bg-white p-2 rounded-xl">
          <img
            src={voucher.image}
            alt={name}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="col-span-4 bg-white p-2 rounded-xl space-y-3">
          <div className="text-2xl font-bold mb-2">
            {voucher.name}
          </div>

          <div className="text-xl font-bold text-red-600">
            Type: {voucher.type}
          </div>

          <div>
            Price require: {voucher.priceRequired}
          </div>

          <div>
            Discount: {voucher.discount}
          </div>

        </div>

      </div>


      <div className="bg-slate-300 grid mx-12 space-x-4 rounded-xl p-4 py-4">
        {voucher.description}
      </div>
    </div>
  );
};

export default VoucherPage;