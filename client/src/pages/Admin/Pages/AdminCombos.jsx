import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getItemFromLocalStorage } from '../../../utils/index.js';
import { Link } from 'react-router-dom';

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
  };

  useEffect(() => {
    getComboData().then(() => {
    });
    console.log('Load index page');
  }, []);

  return (
    <div>
      <div className='mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {combo.length > 0 && combo.map((comboItem) => (
          <>
            <Link to={`/admin/combos/${comboItem._id}`} key={comboItem._id}>
              <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
                Need to set image
              </div>
              <div>
                <h2 className='font-bold'>{comboItem.name}</h2>
                <h3 className='text-sm text-gray-500 '>{comboItem.price}</h3>
              </div>
              <div>
                <span className='font-semibold'>${comboItem.discount} </span>
                discount
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}