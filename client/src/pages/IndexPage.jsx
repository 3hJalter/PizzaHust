import React, { useContext, useEffect } from 'react';
import { UserContext } from '../providers/UserProvider.jsx';
import { Navigate } from 'react-router-dom';
import MenuList from '../components/MenuList.jsx';

const IndexPage = () => {
  const {user, setUser} = useContext(UserContext)
  if (user && user.role === 'Admin')
    return <Navigate to={'/admin'} />;
  if (user && user.role === 'Customer')
    return (
      // <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      // </div>
      <MenuList/>
    );
  return (
    <>
      <MenuList/>
    </>
  )

};

export default IndexPage;
