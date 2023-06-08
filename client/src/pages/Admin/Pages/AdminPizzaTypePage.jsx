import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

const AdminPizzaTypePage = () => {
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
      axios.get(`/pizzaType/${id}`).then((response) => {
        const { pizzaType } = response.data;
        setName(pizzaType.name);
        setDescription(pizzaType.description);
        setImage(pizzaType.image);
      });
    }
    setLoading(false);
    setDataFetched(true);
  }, [id]);

  const savePizzaType = async (e) => {
    e.preventDefault();
    const token = getItemFromLocalStorage('token');
    let pizzaTypeData = {
      name,
      description,
      image,
    };
    if (id) {
      pizzaTypeData = { id, ...pizzaTypeData };
      // update existing pizza type
      const { data } = await axios.put(
        `/pizzaType/${id}`,
        { pizzaType: pizzaTypeData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    } else {
      // new pizza type
      const { data } = await axios.post(
        '/pizzaType/add-pizzaType',
        { pizzaType: pizzaTypeData },
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
    return <Navigate to={'/admin/pizzaTypes'} />;
  }

  if (loading || !dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Go to pizza type with id = {id}</div>
      <div className='mx-8'>
        <h2 className='text-2xl mt-4'>Name</h2>
        <p className='text-gray-500 text-sm'>Name of the pizza type</p>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name, for example: Margherita'
        />

        <h2 className='text-2xl mt-4'>Description</h2>
        <p className='text-gray-500 text-sm'>Description of the pizza type</p>
        <input
          id='description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='description, for example: Classic Italian pizza with tomato and mozzarella'
        />

        <h2 className='text-2xl mt-4'>Image</h2>
        <p className='text-gray-500 text-sm'>Image link of the pizza type</p>
        <input
          id='image'
          type='text'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='image link, for example: https://example.com/pizza.jpg'
        />

        <button
          className='primary hover:bg-secondary transition my-4'
          onClick={(e) => {
            savePizzaType(e).then(() => {});
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminPizzaTypePage;
