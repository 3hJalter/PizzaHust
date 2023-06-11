import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

const AdminSideDishPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [sideDishTypeId, setSideDishTypeId] = useState('');

  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const [sideDishTypes, setSideDishTypes] = useState([]);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/sideDishType`).then((response) => {
      const result = response.data.types;
      setSideDishTypes(result);
    });
    if (id) {
      axios.get(`/sideDish/${id}`).then((response) => {
        const { sideDish } = response.data;
        setName(sideDish.name);
        setDescription(sideDish.description);
        setImage(sideDish.image);
        setPrice(sideDish.price);
        setSideDishTypeId(sideDish.sideDishTypeId);
      });
    }
    setLoading(false);
    setDataFetched(true);
  }, [id]);

  const saveSideDish = async (e) => {
    e.preventDefault();
    const token = getItemFromLocalStorage('token');
    let sideDishData = {
      name,
      description,
      image,
      price,
      sideDishTypeId,
    };
    if (id) {
      sideDishData = { id, ...sideDishData };
      // update existing side dish
      const { data } = await axios.put(
        `/sideDish/${id}`,
        { sideDish: sideDishData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    } else {
      // new side dish
      const { data } = await axios.post(
        '/sideDish/add-side-dish',
        { sideDish: sideDishData },
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
    return <Navigate to={'/admin/sideDishes'} />;
  }

  if (loading || !dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Go to side dish with id = {id}</div>
      <div className='mx-8'>
        <h2 className='text-2xl mt-4'>Name</h2>
        <p className='text-gray-500 text-sm'>Name of the side dish</p>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name, for example: French Fries'
        />

        <h2 className='text-2xl mt-4'>Description</h2>
        <p className='text-gray-500 text-sm'>Description of the side dish</p>
        <input
          id='description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='description, for example: Delicious crispy fries'
        />

        <h2 className='text-2xl mt-4'>Price</h2>
        <p className='text-gray-500 text-sm'>Price of the side dish</p>
        <div>
          <input
            id='price'
            type='number'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder='1'
          />
        </div>

        <h2 className='text-2xl mt-4'>Image</h2>
        <p className='text-gray-500 text-sm'>Image link of the side dish</p>
        <div>
          <input
            id='image'
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder='image link'
          />
        </div>

        <h2 className='text-2xl mt-4'>Side Dish Type</h2>
        <p className='text-gray-500 text-sm'>Select a side dish type</p>
        <select
          id='sideDishTypeId'
          value={sideDishTypeId}
          onChange={(e) => setSideDishTypeId(e.target.value)}
        >
          <option value=''>Select a Side Dish Type</option>
          {sideDishTypes.map((type) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>

        <button
          className='primary hover:bg-secondary transition my-4'
          onClick={(e) => {
            saveSideDish(e).then(() => {});
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminSideDishPage;
