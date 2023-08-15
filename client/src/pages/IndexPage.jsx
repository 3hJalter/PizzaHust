import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider.jsx';
import { Link, Navigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../utils/index.js';
import axios from 'axios';
import './Admin/App.css';

const IndexPage = () => {
  const { user } = useContext(UserContext);
  const token = getItemFromLocalStorage('token');
  const [pizza, setPizza] = useState([]);
  const [pizzaType, setPizzaType] = useState([]);
  const [combo, setCombo] = useState([]);
  const [voucher, setVoucher] = useState([]);


  const getCombo = async () => {
    try {
      const { data } = await axios.get(`/combo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setCombo(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getVoucher = async () => {
    try {
      const { data } = await axios.get(`/voucher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setVoucher(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getPizzaData = async () => {
    const { data } = await axios.get(`/pizza`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPizza(data);
  };

  const getPizzaTypeData = async () => {
    const { data } = await axios.get(`/pizzaType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPizzaType(data);
  };

  const getPizzaTypeName = (pizzaTypeId) => {
    const pizzaTypeObj = pizzaType.find((type) => type._id === pizzaTypeId);
    return pizzaTypeObj ? pizzaTypeObj.name : '';
  };

  useEffect(() => {
    getPizzaData();
    getPizzaTypeData();
    getPizzaTypeName();
    getCombo();
    getVoucher();
    console.log('Load index page');
  }, []);
  if (user && user.role === 'Admin')
    return <Navigate to={'/admin'} />;
  if (user && user.role === 'Customer')
    return (
      <div className='mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      </div>
    );
  return (
    <>

      <br></br>

      <ul className='list-none flex flex-wrap justify-center'>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/voucher/'>Vouchers</a>
        </li>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/combo/'>Combos</a>
        </li>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/pizza/'>Pizzas</a>
        </li>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/sideDish/'>Side Dishes</a>
        </li>

      </ul>
      <hr className='p-50'></hr>
      <br></br>
      <br></br>

      <h1 className='text-left text-6xl titleh1'>
        Combo List
      </h1>
      <div className='productList'>
        <ul className='list-none flex flex-wrap justify-center'>
          {combo.length > 0 && combo.map((comboItem) => (

            <li className='m-10 p-10 '>

              <div className='product-list-container' key={comboItem._id}>
                <div className='product-card'><a href={`/combo/${comboItem._id}`}>
                  <img src={comboItem.image} alt={comboItem.name} /></a>
                  <strong className='product-title'>Name: {comboItem.name}</strong>
                  <p className='product-price'>Description: {comboItem.description}</p>
                  <p className='product-price'>Price: {comboItem.price}</p>
                  <br></br>
                  <a className='addbtn' href=''>Add to cart</a>
                  <Link class='addbtn' to={`/combo/${comboItem._id}`}>More details</Link>
                </div>
              </div>

            </li>

          ))}
        </ul>
      </div>
      <br></br>
      <br></br>
      <div className=''>
        <h1 className='text-left text-6xl titleh1'>
          Pizza List
        </h1>
      </div>

      <div className='productList'>
        <ul className='list-none flex flex-wrap justify-center'>
          {pizza.length > 0 && pizza.map((pizzaItem) => (

            <li className='m-10 p-10 '>

              <div className='product-list-container' key={pizzaItem._id}>
                <div className='product-card'><a href={`/pizza/${pizzaItem._id}`}>
                  <img src={pizzaItem.image} alt={pizzaItem.name} /></a>
                  <strong className='product-title'>Name: {pizzaItem.name}</strong>
                  <p className='product-description'>Type: {getPizzaTypeName(pizzaItem.pizzaTypeId)}</p>
                  <p className='product-price'>Size: {pizzaItem.pizzaSize}</p>
                  <p className='product-price'>Price: {pizzaItem.price}</p>
                  <br></br>
                  <a className='addbtn' href=''>Add to cart</a> <Link class='addbtn' to={`/pizza/${pizzaItem._id}`}>More
                    details</Link>
                </div>
              </div>

            </li>

          ))}
        </ul>
      </div>
      <br></br>
      <br></br>
      <div className=''>
        <h1 className='text-left text-6xl titleh1'>
          Voucher List
        </h1>
      </div>

      <div className='productList'>
        <ul className='list-none flex flex-wrap justify-center'>
          {voucher.length > 0 && voucher.map((voucherItem) => (

            <li className='m-10 p-10 '>

              <div className='product-list-container' key={voucherItem._id}>
                <div className='product-card'><a href='/pizza/${pizzaItem._id}'>
                  <img src={voucherItem.image} alt={voucherItem.name} /></a>
                  <strong className='product-title'>Name: {voucherItem.name}</strong>
                  <p className='product-description'>Description: {voucherItem.description}</p>
                  <p className='product-price'>Type: {voucherItem.type}</p>
                  <p className='product-price'>Discount amount: {voucherItem.discount}</p>
                  <p className='product-price'>Minimum price required: {voucherItem.priceRequired}</p>
                  <br></br>
                  <Link class='addbtn' to='`/pizza/${pizzaItem._id}`'>More details</Link>
                </div>
              </div>

            </li>

          ))}
        </ul>
      </div>
    </>
  );

};

export default IndexPage;
