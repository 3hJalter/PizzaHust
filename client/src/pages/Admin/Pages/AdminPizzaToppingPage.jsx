import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

const AdminPizzaToppingPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios.get(`/pizzaTopping/${id}`).then((response) => {
        const pizzaTopping = response.data.topping;
        setName(pizzaTopping.name);
        setImage(pizzaTopping.image);
        setPrice(pizzaTopping.price);
      });
    }
    setLoading(false);
    setDataFetched(true);
  }, [id]);

  const savePizzaTopping = async (e) => {
    e.preventDefault();
    const token = getItemFromLocalStorage('token');
    let pizzaToppingData = {
      name,
      image,
      price,
    };
    if (id) {
      pizzaToppingData = { id, ...pizzaToppingData };
      // update existing pizza topping
      const { data } = await axios.put(
        `/pizzaTopping/${id}`,
        { pizzaTopping: pizzaToppingData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    } else {
      // new pizza topping
      const { data } = await axios.post(
        '/pizzaTopping/add-pizza-topping',
        { pizzaTopping: pizzaToppingData },
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
    return <Navigate to={'/admin/pizzaToppings'} />;
  }

  if (loading || !dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Go to pizza topping with id = {id}</div>
      <div className='mx-8'>
        <h2 className='text-2xl mt-4'>Name</h2>
        <p className='text-gray-500 text-sm'>Name of the pizza topping</p>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name, for example: Pepperoni'
        />

        <h2 className='text-2xl mt-4'>Image</h2>
        <p className='text-gray-500 text-sm'>Image link of the pizza topping</p>
        <input
          id='image'
          type='text'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='image link, for example: https://example.com/topping.jpg'
        />

        <h2 className='text-2xl mt-4'>Price</h2>
        <p className='text-gray-500 text-sm'>Price of the pizza topping</p>
        <input
          id='price'
          type='number'
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder='price, for example: 1.99'
        />

        <button
          className='primary hover:bg-secondary transition my-4'
          onClick={(e) => {
            savePizzaTopping(e).then(() => {});
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminPizzaToppingPage;
