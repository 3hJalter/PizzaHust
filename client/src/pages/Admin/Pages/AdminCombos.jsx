import axios from 'axios';
import {useState, useEffect} from 'react';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { data } from 'autoprefixer';

export default function AdminCombos() {
  const token = getItemFromLocalStorage('token');
  const [combo, setCombo] = useState([]);

  const getComboData = async () => {
    const { data } = await axios.get(`/combo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data.combos);
    setCombo(data.combos);
  }

  useEffect(() => {
    getComboData().then(() => {});
    console.log('Load index page');
  }, []);

  return (
    <div>
      <h2>Admin Combos</h2>
      {combo.map((comboItem) => (
        <div key={comboItem._id}>
          <h3>{comboItem.name}</h3>
          <p>{comboItem.description}</p>
          <p>Price: {comboItem.price}</p>
          <p>Discount: {comboItem.discount}%</p>
          <ul>
            <li>Pizzas: {comboItem.pizzaListId.join(', ')}</li>
            <li>Side Dishes: {comboItem.sideDishListId.join(', ')}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}