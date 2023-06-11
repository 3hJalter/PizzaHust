import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

const AdminVoucherPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [priceRequired, setPriceRequired] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [type, setType] = useState('minus');

  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios.get(`/voucher/${id}`).then((response) => {
        const { voucher } = response.data;
        setName(voucher.name);
        setDescription(voucher.description);
        setImage(voucher.image);
        setPriceRequired(voucher.priceRequired);
        setDiscount(voucher.discount);
        setType(voucher.type);
      });
    }
    setLoading(false);
    setDataFetched(true);
  }, [id]);

  const saveVoucher = async (e) => {
    e.preventDefault();
    const token = getItemFromLocalStorage('token');
    let voucherData = {
      name,
      description,
      image,
      priceRequired,
      discount,
      type,
    };
    if (id) {
      voucherData = { id, ...voucherData };
      // update existing voucher
      const { data } = await axios.put(
        `/voucher/${id}`,
        { voucher: voucherData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    } else {
      // new voucher
      const { data } = await axios.post(
        '/voucher/add-voucher',
        { voucher: voucherData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    }
    console.log('Done saving');
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/admin/vouchers'} />;
  }

  if (loading || !dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Go to voucher with id = {id}</div>
      <div className='mx-8'>
        <h2 className='text-2xl mt-4'>Name</h2>
        <p className='text-gray-500 text-sm'>Name of the voucher</p>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name, for example: Summer Sale'
        />

        <h2 className='text-2xl mt-4'>Description</h2>
        <p className='text-gray-500 text-sm'>Description of the voucher</p>
        <input
          id='description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='description, for example: Get a discount on all summer menu items'
        />

        <h2 className='text-2xl mt-4'>Image</h2>
        <p className='text-gray-500 text-sm'>Image link for the voucher</p>
        <input
          id='image'
          type='text'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='image link'
        />

        <h2 className='text-2xl mt-4'>Price Required</h2>
        <p className='text-gray-500 text-sm'>Minimum price required to use the voucher</p>
        <input
          id='priceRequired'
          type='number'
          value={priceRequired}
          onChange={(e) => setPriceRequired(Number(e.target.value))}
          placeholder='price required, for example: 50'
        />

        <h2 className='text-2xl mt-4'>Discount</h2>
        <p className='text-gray-500 text-sm'>Discount value for the voucher</p>
        <input
          id='discount'
          type='number'
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          placeholder='discount value, for example: 10'
        />

        <h2 className='text-2xl mt-4'>Type</h2>
        <p className='text-gray-500 text-sm'>Type of discount (minus or percent)</p>
        <select
          id='type'
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value='minus'>Minus</option>
          <option value='percent'>Percent</option>
        </select>

        <button
          className='primary hover:bg-secondary transition my-4'
          onClick={(e) => {
            saveVoucher(e).then(() => {});
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminVoucherPage;
