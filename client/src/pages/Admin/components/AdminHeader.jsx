import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../providers/UserProvider.jsx';
import { removeItemFromLocalStorage } from '../../../utils/index.js';
import { toast } from 'react-toastify';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const AdminHeader = () => {
  const { loading, user, setUser } = useContext(UserContext);
  const logout = async () => {
    setUser(null);
    removeItemFromLocalStorage('token');
    toast.success('Logged out');
    history.push('/');
    window.location.reload();
  };

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
      <div className="flex items-center space-x-4 cursor-pointer hover:scale-110 transition transform duration-200 ease-out">
        <button
          className="flex gap-2 items-center border border-gray-300 rounded-3xl py-2 px-4  hover:shadow-3xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};
