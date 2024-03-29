import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import AccountNav from '../components/AccountNav';
import Spinner from '../components/Spinner';
import { removeItemFromLocalStorage } from '../utils';
import { toast } from 'react-toastify';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const ProfilePage = () => {
  const { loading, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const logout = async () => {
    setUser(null);
    removeItemFromLocalStorage('token');
    toast.success('Logged out');
    setRedirect('/');
    window.location.reload();
  };

  if (loading) {
    return <Spinner />;
  }

  if (!loading && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in
          <br />
          <button
            className="primary max-w-sm mt-4 hover:bg-red-700 hover:scale-110 transition transform duration-200 ease-out"
            onClick={logout}
          >
            <LoginOutlinedIcon className="mr-2" />
            Logout
          </button>
        </div>
      )}
      {subpage === 'orders' && <OrderHistoryPage />}
    </div>
  );
};

export default ProfilePage;
