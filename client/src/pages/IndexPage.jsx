import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider.jsx';
import { Navigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../utils/index.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import './Admin/App.css';

const WhiteBox = styled.ul`
  list-style-type: none;
  padding: 50px;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
`;


const ItemSlot = styled.li`
 width: 400px;
 margin: 10px;
 padding: 10px;

`;

const ProductList = styled.div`
  text-align: center
`;


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
    setPizza(data.pizzas)
  }

  const getPizzaTypeData = async () => {
    const { data } = await axios.get(`/pizzaType`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data.types);
    setPizzaType(data.types)
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
  if (user && user.role === 'Customer'){
    
    return (
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      </div>
    );}
    return (
    <>
      <ProductList>
      {/* <div className='m-50 p-50'>
        Product list
      </div> */}
        <WhiteBox> 
        {pizza.length > 0 && pizza.slice(0,12).map((pizzaItem) => (
          <ItemSlot>
            <div class="product-list-container" key={pizzaItem._id}>
              
              <div class="product-card"><a href=''>
                <img  src={pizzaItem.image} alt={pizzaItem.name}/></a>
                <strong class="product-title">Name: {pizzaItem.name}</strong>
                <p class="product-description">Type: {getPizzaTypeName(pizzaItem.pizzaTypeId)}</p>
                <p class="product-price">Size: {pizzaItem.pizzaSize}</p>
                <p class="product-price">Price: {pizzaItem.price}</p>
                <br></br>
                <a class="addbtn" href="">Add to cart</a>
              </div>
            </div>
          </ItemSlot>
          ))}
          </WhiteBox>
      </ProductList>
    </>
  )
  
};

export default IndexPage;
