import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from '../App';

import DropdownButton from './DropdownButton';


export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);


  return (

    <div>
      <header className="flex items-center justify-between">
        <div className='flex'>
          <Link to={'/'} className="flex items-center gap-1">
            <img
              className="h-2- w-20 min-w-[36px]"
              src="https://i.imgur.com/7nW34R7.png"
              alt=""
            />
          </Link>

          <DropdownButton />
        </div>



        <div className='flex gap-7'>
          <div className='flex gap-5 items-center border border-gray-300 rounded-3xl py-2 px-4  hover:shadow-3xl'>
            <Link to='/cart' className="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>

            </Link>


          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:scale-110 transition transform duration-200 ease-out">
            <Link
              to={user ? '/account' : '/login'}
              className="flex gap-2 items-center border border-gray-300 rounded-3xl py-2 px-4  hover:shadow-3xl"
            >
              <MenuIcon />
              <div className="overflow-hidden">
                <AccountCircleIcon />
              </div>
              {user && <div className="hidden sm:block username">{user.name}</div>}
            </Link>
          </div>
        </div>
      </header>


    </div>
  );
};
