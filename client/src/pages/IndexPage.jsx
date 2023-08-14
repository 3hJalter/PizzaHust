import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider.jsx';
import { Navigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../utils/index.js';
import axios from 'axios';
import './Admin/App.css';
import { Link } from "react-router-dom";

const IndexPage = () => {
  const {user, setUser} = useContext(UserContext);
  const token = getItemFromLocalStorage('token');
  const [pizza, setPizza] = useState([]);
  const [pizzaType, setPizzaType] = useState([]);
  const getPizzaData = async () => {
    const { data } = await axios.get(`/pizza`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPizza(data)
  }

  const getPizzaTypeData = async () => {
    const { data } = await axios.get(`/pizzaType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPizzaType(data)
  }

  const getPizzaTypeName = (pizzaTypeId) => {
    const pizzaTypeObj = pizzaType.find((type) => type._id === pizzaTypeId);
    return pizzaTypeObj ? pizzaTypeObj.name : '';
  };

  useEffect(() => {
      getPizzaData();
      getPizzaTypeData();
      getPizzaTypeName();
      console.log('Load index page');
    }, []);
  if (user && user.role === 'Admin')
    return <Navigate to={'/admin'} />;
  if (user && user.role === 'Customer')
    return (
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      </div>
    );
  return (
    <>
    <br></br>

    <ul className='list-none flex flex-wrap justify-center'>
    <li className='m-5 p-5'>
        <a class="addbtn" href='/voucher/'>Voucher</a>
      </li>
      <li className='m-5 p-5'>
        <a class="addbtn" href='/combo/'>Combo</a>
      </li>
      <li className='m-5 p-5'>
        <a class="addbtn" href='/pizza/'>All Pizzas</a>
      </li>
      <li className='m-5 p-5'>
        <a class="addbtn" href='/sideDish/'>Side Dish</a>
      </li>

    </ul>
    <hr className='p-50'></hr>
    <br></br>
    <br></br>
    <div className="">
      <h1 className='text-left text-6xl titleh1'>
        Pizza List
      </h1>
    </div>

    <div class="productList">
    <ul className='list-none flex flex-wrap justify-center'>
        {pizza.length > 0 && pizza.map((pizzaItem) => (
          <li className='m-10 p-10 '>
            <div class="product-list-container" key={pizzaItem._id}>             
              <div class="product-card"><a href='/pizza/${pizzaItem._id}'>
                <img  src={pizzaItem.image} alt={pizzaItem.name}/></a>
                <strong class="product-title">Name: {pizzaItem.name}</strong>
                <p class="product-description">Type: {getPizzaTypeName(pizzaItem.pizzaTypeId)}</p>
                <p class="product-price">Size: {pizzaItem.pizzaSize}</p>
                <p class="product-price">Price: {pizzaItem.price}</p>
                <br></br>
                <a class="addbtn" href="">Add to cart</a>        <Link class="addbtn" to="`/pizza/${pizzaItem._id}`">More details</Link>
              </div>
            </div>
          </li>
          ))}
      </ul>
    </div>
    </>
  )

};

export default IndexPage;
