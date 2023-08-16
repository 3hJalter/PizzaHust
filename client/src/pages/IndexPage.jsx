import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItemFromLocalStorage } from '../utils/index.js';
import axios from 'axios';
import '../styles/App2.css';

const IndexPage = () => {
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

  const [sideDish, setSideDish] = useState([]);
  const [sideDishType, setSideDishType] = useState([]);

  const getSideDish = async () => {
      const { data } = await axios.get(`/sideDish`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSideDish(data);
  }

  const getSideDishTypeData = async () => {
    const { data } = await axios.get(`/sideDishType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setSideDishType(data);
  };
  const getSideDishType = async (sideDishTypeID) => {
    try {
      const response = await axios.get(`/sideDishType/${sideDishTypeID._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSideDishType(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPizzaData();
    getPizzaTypeData();
    getPizzaTypeName();
    getCombo();
    getVoucher();
    getSideDish();
    getSideDishTypeData();
    console.log('Load index page');
  }, []);
  return (
    <>

      <br></br>

      <ul className='list-none flex flex-wrap justify-center'>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/voucher-list/'>Vouchers</a>
        </li>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/combo-list/'>Combos</a>
        </li>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/pizza-list/'>Pizzas</a>
        </li>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/pizzaTopping-list/'>PizzaTopping</a>
        </li>
        <li className='m-5 p-5'>
          <a className='addbtn' href='/sideDish-list/'>Side Dishes</a>
        </li>

      </ul>
      <hr className='p-50'></hr>
      <br></br>
      <br></br>

      <h1 className='text-left text-3xl titleh1'>
        Combo
      </h1>
      <div className='productList'>
        <ul className='list-none flex flex-wrap'>
          {combo.length > 0 && combo.map((comboItem) => (

            <li key={comboItem._id} className='m-2 p-2 '>

              <div className='product-list-container' key={comboItem._id}>
                <div className='product-card'><a href={`/combo/${comboItem._id}`}>
                  <img src={comboItem.image} alt={comboItem.name} /></a>
                  <strong className='product-title'>{comboItem.name}</strong>
                  <p className='product-price'>Price: {comboItem.price}</p>
                  <br></br>
                  <Link className='addbtn' to={`/combo/${comboItem._id}`}>More details</Link>
                </div>
              </div>

            </li>

          ))}
        </ul>
      </div>
      <br></br>
      <br></br>
      <div className=''>
        <h1 className='text-left text-3xl titleh1'>
          Pizza
        </h1>
      </div>

      <div className='productList'>
        <ul className='list-none flex flex-wrap'>
          {pizza.length > 0 && pizza.map((pizzaItem) => (

            <li key={pizzaItem._id} className='m-2 p-2 '>

              <div className='product-list-container' key={pizzaItem._id}>
                <div className='product-card'><a href={`/pizza/${pizzaItem._id}`}>
                  <img src={pizzaItem.image} alt={pizzaItem.name} /></a>
                  <strong className='product-title'>Name: {pizzaItem.name}</strong>
                  <p className='product-description'>Type: {getPizzaTypeName(pizzaItem.pizzaTypeId)}</p>
                  <p className='product-price'>Price: {pizzaItem.price}</p>
                  <br></br>
                  <Link className='addbtn' to={`/pizza/${pizzaItem._id}`}>More details</Link>
                </div>
              </div>

            </li>

          ))}
        </ul>
      </div>
      <br></br>
      <br></br>
      <div className=''>
        <h1 className='text-left text-3xl titleh1'>
          Voucher
        </h1>
      </div>

      <div className='productList'>
        <ul className='list-none flex flex-wrap'>
          {voucher.length > 0 && voucher.map((voucherItem) => (

            <li key={voucherItem._id} className='m-2 p-2 '>

              <div className='product-list-container' key={voucherItem._id}>
                <div className='product-card'><a href={`/voucher/${voucherItem._id}`}>
                  <img src={voucherItem.image} alt={voucherItem.name} /></a>
                  <strong className='product-title'>{voucherItem.name}</strong>
                  <p className='product-description'>{voucherItem.description}</p>
                  <Link className='addbtn' to={`/voucher/${voucherItem._id}`}>More details</Link>
                </div>
              </div>

            </li>

          ))}
        </ul>
      </div>
      <br/><br/>
      <h1 className='text-left text-3xl titleh1'>
        Side Dish
      </h1>
      <div className='productList'>
        <ul className='list-none flex flex-wrap'>
          {sideDish.length > 0 && sideDish.map((sideDishItem) => (

            <li key={sideDishItem._id} className='m-2 p-2 '>

              <div className='product-list-container' key={sideDishItem._id}>
                <div className='product-card'><a href={`/sideDish/${sideDishItem._id}`}>
                  <img src={sideDishItem.image} alt={sideDishItem.name} /></a>
                  <strong className='product-title'>{sideDishItem.name}</strong>
                  <strong className='product-title'>{getSideDishType(sideDishItem.sideDishTypeId).name}</strong>
                  <p className='product-price'>Price: {sideDishItem.price}</p>
                  <br></br>
                  <Link className='addbtn' to={`/sideDish/${sideDishItem._id}`}>More details</Link>
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
