import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

const AdminSideDishTypePage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios.get(`/sideDishType/${id}`).then((response) => {
        const { sideDishType } = response.data;
        setName(sideDishType.name);
        setDescription(sideDishType.description);
        setImage(sideDishType.image);
      });
    }
    setLoading(false);
    setDataFetched(true);
  }, [id]);

  const saveSideDishType = async (e) => {
    e.preventDefault();
    const token = getItemFromLocalStorage('token');
    let sideDishTypeData = {
      name,
      description,
      image,
    };
    if (id) {
      sideDishTypeData = { id, ...sideDishTypeData };
      // update existing side dish type
      const { data } = await axios.put(
        `/sideDishType/${id}`,
        { sideDishType: sideDishTypeData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    } else {
      // new side dish type
      const { data } = await axios.post(
        '/sideDishType/add-side-dish',
        { sideDishType: sideDishTypeData },
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
    return <Navigate to={'/admin/sideDishTypes'} />;
  }

  if (loading || !dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Go to side dish type with id = {id}</div>
      <div className='mx-8'>
        <h2 className='text-2xl mt-4'>Name</h2>
        <p className='text-gray-500 text-sm'>Name of the side dish type</p>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name, for example: Appetizers'
        />

        <h2 className='text-2xl mt-4'>Description</h2>
        <p className='text-gray-500 text-sm'>Description of the side dish type</p>
        <input
          id='description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='description, for example: Start your meal with these delicious appetizers'
        />

        <h2 className='text-2xl mt-4'>Image</h2>
        <p className='text-gray-500 text-sm'>Image link of the side dish type</p>
        <div>
          <input
            id='image'
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder='image link'
          />
        </div>

        <button
          className='primary hover:bg-secondary transition my-4'
          onClick={(e) => {
            saveSideDishType(e).then(() => {});
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminSideDishTypePage;
