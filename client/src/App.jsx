import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailPage from './pages/OrderDetailPage';

import PizzaPage from './pages/PizzaPage';
import ComboPage from './pages/ComboPage';
import SideDishPage from './pages/SideDishPage';
import PizzaToppingPage from './pages/PizzaToppingPage';

import axios from 'axios';
import { getItemFromLocalStorage } from './utils';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './providers/UserProvider';
import Footer from './components/Footer';
import NotFound from './pages/ErrorPage/NotFound';
import React, { createContext } from 'react';
import './styles/App.css';
import { MapProvider } from './providers/MapProvider.jsx';

const token = getItemFromLocalStorage('token');

axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className='App' id={theme}>
        <UserProvider>
          <MapProvider>
            <Routes>
              <Route path='/' element={<Layout /> }>
                <Route index element={<IndexPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/combo/:id' element={<ComboPage />} />
                <Route path='/pizza/:id' element={<PizzaPage />} />
                <Route path='/sideDish/:id' element={<SideDishPage />} />
                <Route path='/pizzaTopping' element={<PizzaToppingPage />} />
                <Route path='/voucher' element={<SideDishPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/account' element={<ProfilePage />} />
                <Route path='/account/orders' element={<OrderHistoryPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/order' element={<OrderPage />} />
                <Route path='/order/:id' element={<OrderDetailPage />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
            <Footer />
            <ToastContainer autoClose={2000} transition={Slide} />
          </MapProvider>
        </UserProvider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
