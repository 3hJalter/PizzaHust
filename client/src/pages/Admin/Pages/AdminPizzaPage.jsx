import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

const AdminPizzaPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [pizzaSize, setPizzaSize] = useState('');
  const [pizzaTypeId, setPizzaTypeId] = useState('');
  const [price, setPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const [pizzaTypes, setPizzaTypes] = useState([]);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id)
      axios.get(`/pizza/${id}`).then((response) => {
        const { pizza } = response.data;
        setName(pizza.name);
        setDescription(pizza.description);
        setImage(pizza.image);
        setPizzaSize(pizza.pizzaSize);
        setPizzaTypeId(pizza.pizzaTypeId);
        setPrice(pizza.price);
      });
    axios.get(`/pizzaType`).then((response) => {
      const result = response.data.types;
      console.log(result);
      setPizzaTypes(result);
    }).finally(() => {
      console.log(pizzaTypes);
      setLoading(false);
      setDataFetched(true);
    });
  }, [id]);

  const savePizza = async (e) => {
    e.preventDefault();
    const token = getItemFromLocalStorage('token');
    let pizzaData = {
      name,
      description,
      image,
      pizzaSize,
      pizzaTypeId,
      price,
    };
    if (id) {
      pizzaData = { id, ...pizzaData };
      // update existing pizza
      const { data } = await axios.put(
        '/pizza/update-pizza',
        { pizzaData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    } else {
      // new pizza
      const { data } = await axios.post(
        '/pizza/add-pizza',
        { pizzaData },
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
    return <Navigate to={'/admin/pizzas'} />;
  }

  const preInput = (header, description) => {
    return (
      <>
        <h2 className='text-2xl mt-4'>{header}</h2>
        <p className='text-gray-500 text-sm'>{description}</p>
      </>
    );
  };

  if (loading || !dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Go to pizza with id = ${id}</div>
      <div className='mx-8'>
        {preInput(
          'Name',
          'Name of the pizza',
        )}
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name, for example: Margherita'
        />

        {preInput(
          'Description',
          'Description of the pizza',
        )}
        <input
          id='description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='description, for example: Fresh tomatoes, basil, mozzarella'
        />

        {preInput(
          'Image',
          'Image link of the pizza',
        )}
        <div>
          <input
            id='image'
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder='image link, for example: https://example.com/pizza.jpg'
          />
        </div>

        {preInput(
          'Pizza Size',
          'Size of the pizza',
        )}
        <div>
          <input
            id='pizzaSize'
            type='text'
            value={pizzaSize}
            onChange={(e) => setPizzaSize(e.target.value)}
            placeholder='size, for example: Large'
          />
        </div>

        {preInput(
          'Pizza Type',
          'Type of the pizza',
        )}
        <div>
          <select
            id='pizzaTypeId'
            value={pizzaTypeId}
            onChange={(e) => setPizzaTypeId(e.target.value)}
          >
            <option value=''>Select a Pizza Type</option>
            {pizzaTypes.map((pizzaType) => (
              <option key={pizzaType._id} value={pizzaType._id}>
                {pizzaType.name}
              </option>
            ))}
          </select>
        </div>

        {preInput(
          'Price',
          'Price of the pizza',
        )}
        <div>
          <input
            id='price'
            type='number'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder='price, for example: 9.99'
          />
        </div>

        <button
          className='primary hover:bg-secondary transition my-4'
          onClick={(e) => {
            savePizza(e).then(() => {});
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminPizzaPage;
