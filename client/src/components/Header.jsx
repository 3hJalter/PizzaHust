import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import SearchBar from './SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from '../App';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { HeartIcon } from '@heroicons/react/solid';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  return (
    <header className="flex items-center justify-between">
      <Link to={'/'} className="flex items-center gap-1">
        <img
          className="h-8 w-8 md:h-10 md:w-10 min-w-[36px]"
          src="https://png.pngtree.com/png-vector/20220910/ourmid/pngtree-pizza-logo-png-image_6147023.png"
          alt=""
        />

        <span className="hidden md:block font-bold text-2xl text-red-500">
          PizzaHust
        </span>
      </Link>
      <SearchBar />
      <div className={'switch'}>
        <IconButton
          onClick={toggleTheme}
          className="flex hover:scale-110 transition transform duration-200 ease-out"
        >
          {theme === 'dark' ? (
            <Brightness7Icon style={{ color: 'white' }} />
          ) : (
            <Brightness4Icon style={{ color: 'black' }} />
          )}
        </IconButton>
      </div>
      <div className="bookmart">
          <HeartIcon className="z-0 hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2
                  cursor-pointer hover:bg-red-700 duration-200 ease-out"
                     onClick={() => {console.log("Open bookmark")}}/>
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
    </header>
  );
};
