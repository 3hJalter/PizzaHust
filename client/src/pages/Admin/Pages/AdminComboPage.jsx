import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

const AdminComboPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState('');
  const [pizzaListId, setPizzaListId] = useState([]);
  const [sideDishListId, setSideDishListId] = useState([]);
  const [price, setPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const [pizzaList, setPizzaList] = useState([]);
  const [sideDishList, setSideDishList] = useState([]);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id)
      axios.get(`/combo/${id}`).then((response) => {
        const { combo } = response.data;
        console.log('Get side id: ', combo.sideDishListId);
        setName(combo.name);
        setDescription(combo.description);
        setDiscount(combo.discount);
        setImage(combo.image);
        setPizzaListId(combo.pizzaListId);
        setSideDishListId(combo.sideDishListId);
        setPrice(combo.price);
      });
    axios.get(`/pizza`).then((response) => {
      const result = response.data.pizzas;
      setPizzaList(result);
      console.log('PizzaList: ', result);
    });
    axios.get('/sideDish').then((response) => {
      const result = response.data.sideDishes;
      setSideDishList(result);
      console.log('SideDishLish: ', result);
    }).finally(() => {
      setLoading(false);
      setDataFetched(true);
    });
  }, [id]);

  const calculatePrice = () => {
    let total = 0;

    pizzaListId.forEach((pizzaId) => {
      const pizza = pizzaList.find((pizza) => pizza._id === pizzaId);
      if (pizza) {
        total += pizza.price;
      }
      console.log('Total after add pizza: ', total);
    });
    console.log('Get side id for cal: ', sideDishListId);
    sideDishListId.forEach((sideDishId) => {
      const sideDish = sideDishList.find((sideDish) => sideDish._id === sideDishId);
      if (sideDish) {
        total += sideDish.price;
      }
      console.log('Total after add sideDish: ', total);
    });

    total -= discount;

    setPrice(total);
  };

  useEffect(() => {
    if (dataFetched) {
      calculatePrice();
    }
  }, [pizzaListId, sideDishListId, discount]);

  const handlePizzaSelect = (e) => {
    const selectedPizzaId = e.target.value;
    setPizzaListId((prevPizzaListId) => [...prevPizzaListId, selectedPizzaId]);
  };

  const handleSideDishSelect = (e) => {
    const selectedSideDishId = e.target.value;
    setSideDishListId((prevSideDishListId) => [...prevSideDishListId, selectedSideDishId]);
  };

  const saveCombo = async (e) => {
    e.preventDefault();
    const token = getItemFromLocalStorage('token');
    let comboData = {
      name,
      description,
      discount,
      image,
      pizzaListId,
      sideDishListId,
      price,
    };
    if (id) {
      comboData = { id, ...comboData };
      // update existing combo
      const { data } = await axios.put(
        '/combo/update-combo',
        { comboData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
    } else {
      // new combo
      const { data } = await axios.post(
        '/combo/add-combo',
        { comboData },
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
    return <Navigate to={'/admin/combos'} />;
  }

  const preInput = (header, description) => {
    return (
      <>
        <h2 className='text-2xl mt-4'>{header}</h2>
        <p className='text-gray-500 text-sm'>{description}</p>
      </>
    );
  };

  const removePizza = (index) => {
    setPizzaListId((prevPizzaListId) => {
      const updatedPizzaListId = [...prevPizzaListId];
      updatedPizzaListId.splice(index, 1);
      return updatedPizzaListId;
    });
  };

  const removeSideDish = (index) => {
    setSideDishListId((prevSideDishListId) => {
      const updatedSideDishListId = [...prevSideDishListId];
      updatedSideDishListId.splice(index, 1);
      return updatedSideDishListId;
    });
  };


  if (loading || !dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Go to combo with id = ${id}</div>
      <div className='mx-8'>
        {preInput(
          'Name',
          'Name of the combo',
        )}
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name, for example: combo 1'
        />

        {preInput(
          'Description',
          'Description of the combo',
        )}
        <input
          id='description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='descrition, for example: My lovely apt'
        />

        {preInput(
          'Price',
          'Price of the combo',
        )}
        <div>
          <input
            id='price'
            type='number'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder='1'
          />
        </div>

        {preInput(
          'Discount',
          'Discount of the combo',
        )}
        <div>
          <input
            id='discount'
            type='number'
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder='1'
          />
        </div>

        {preInput(
          'Image',
          'Image link of the combo',
        )}
        <div>
          <input
            id='image'
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder='1'
          />
        </div>

        <div>
          {preInput('Pizza', 'Select a Pizza')}
          <select
            id='pizzaListId'
            value={''} // Reset the select value after selection
            onChange={handlePizzaSelect}
          >
            <option value=''>Select a Pizza</option>
            {pizzaList.map((pizza) => (
              <option key={pizza._id} value={pizza._id}>
                {pizza.name}
              </option>
            ))}
          </select>

          <h2 className='text-2xl mt-4'>Selected PizzaList:</h2>
          <ul>
            {pizzaListId.map((pizzaId, index) => (
              <li>
                {
                  pizzaList.find((pizza) => pizza._id === pizzaId)?.name}
                <button onClick={() => removePizza(index)}>Remove</button>
              </li>
            ))}
          </ul>

          {/*<h2 className='text-2xl mt-4'>Selected PizzaListId:</h2>*/}
          {/*<p>{pizzaListId.join(', ')}</p>*/}
        </div>

        <div>
          {preInput('Side Dish', 'Select a Side Dish')}
          <select
            id='sideDishListId'
            value={''} // Reset the select value after selection
            onChange={handleSideDishSelect}
          >
            <option value=''>Select a Side Dish</option>
            {sideDishList.map((sideDish) => (
              <option key={sideDish._id} value={sideDish._id}>
                {sideDish.name}
              </option>
            ))}
          </select>

          <h2 className='text-2xl mt-4'>Selected SideDishList:</h2>
          {/*<p>{sideDishListId.map((sideDishId) => sideDishList.find((sideDish) => sideDish.id === sideDishId)?.name).join(', ')}</p>*/}
          <ul>
            {sideDishListId.map((sideDishId, index) => (
              <li>
                {sideDishList.find((sideDish) => sideDish._id === sideDishId)?.name}
                <button onClick={() => removeSideDish(index)}>X</button>
              </li>
            ))}
          </ul>

          {/*<h2 className='text-2xl mt-4'>Selected SideDishListId:</h2>*/}
          {/*<p>{sideDishListId.join(', ')}</p>*/}
        </div>

        <h2 className='text-2xl mt-4'>Total Price: {price}</h2>

        <button className='primary hover:bg-secondary transition my-4'
                onClick={(e) => {
                  saveCombo(e).then(() => {
                  });
                }}>
          Save
        </button>
      </div>
    </>
  );
};

export default AdminComboPage;