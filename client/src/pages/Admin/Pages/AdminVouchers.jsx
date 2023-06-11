import axios from 'axios';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminVouchers() {
  const token = getItemFromLocalStorage('token');
  const [voucher, setVoucher] = useState([]);
  const getVoucherData = async () => {
    const { data } = await axios.get(`/voucher`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setVoucher(data.vouchers);
  }

  useEffect(() => {
    getVoucherData().then(() => {});
  }, []);

  const removeVoucher = async (id) => {
    console.log('id: ' + id)
    try {
      await axios.delete(`/voucher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVoucher(voucher.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <>
      <div>This is Admin Vouchers</div>
      <div>
        <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {voucher.length > 0 && voucher.map((voucherItem) => (
            <div key={voucherItem._id}>
              <Link to={`/admin/vouchers/${voucherItem._id}`} >
                <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                  Need to set image
                </div>
                <div>
                  <h2 className='font-bold'>{voucherItem.image}</h2>
                  Name: <span className='text-sm text-gray-500 '>{voucherItem.name}</span> <br/>
                  Price Required: <span className='text-sm text-gray-500 '>{voucherItem.priceRequired}</span> <br/>
                  Type: <span className='text-sm text-gray-500 '>{voucherItem.type}</span>
                </div>
                <div>
                  Description: <span className='font-semibold'>{voucherItem.description} </span>
                </div>
              </Link>
              <button className='primary hover:bg-secondary transition my-4'
                      onClick={() => {
                        removeVoucher(voucherItem._id).then(() => {
                        });
                      }}>
                Remove
              </button>
            </div>
          ))}
          <Link to={'/admin/vouchers/new'} className="primary hover:bg-secondary transition my-4">
            Add new voucher
          </Link>
        </div>
      </div>
    </>
  );
}