import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TestPage from './pages/TestPage';

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
import AdminPage from './pages/Admin/AdminPage.jsx';
import AdminLayout from './pages/Admin/components/AdminLayout.jsx';
import AdminOrders from './pages/Admin/Pages/AdminOrders.jsx';
import AdminCombos from './pages/Admin/Pages/AdminCombos.jsx';
import AdminPizzas from './pages/Admin/Pages/AdminPizzas.jsx';
import AdminPizzaToppings from './pages/Admin/Pages/AdminPizzaToppings.jsx';
import AdminSideDishes from './pages/Admin/Pages/AdminSideDishes.jsx';
import AdminVouchers from './pages/Admin/Pages/AdminVouchers.jsx';
import AdminUsers from './pages/Admin/Pages/AdminUsers.jsx';
import AdminPizzaTypes from './pages/Admin/Pages/AdminPizzaTypes.jsx';
import AdminSideDishTypes from './pages/Admin/Pages/AdminSideDishTypes.jsx';
import AdminComboPage from './pages/Admin/Pages/AdminComboPage.jsx';
import AdminPizzaPage from './pages/Admin/Pages/AdminPizzaPage.jsx';
import AdminPizzaToppingPage from './pages/Admin/Pages/AdminPizzaToppingPage.jsx';
import AdminPizzaTypePage from './pages/Admin/Pages/AdminPizzaTypePage.jsx';
import AdminSideDishPage from './pages/Admin/Pages/AdminSideDishPage.jsx';
import AdminSideDishTypePage from './pages/Admin/Pages/AdminSideDishTypePage.jsx';
import AdminVoucherPage from './pages/Admin/Pages/AdminVoucherPage.jsx';
import AdminUserPage from './pages/Admin/Pages/AdminUserPage.jsx';

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
                <Route index element={<ComboPage id='649c4ab36d62981af81aa651'/>} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/account' element={<ProfilePage />} />
                <Route path='*' element={<NotFound />} />
              </Route>
              <Route path='/admin' element={<AdminLayout/>}>
                <Route index element={<AdminPage />} />
                <Route path='/admin/orders' element={<AdminOrders />} />
                <Route path='/admin/combos' element={<AdminCombos />} />
                <Route path='/admin/combos/new' element={<AdminComboPage />} />
                <Route path='/admin/combos/:id' element={<AdminComboPage/>}/>
                <Route path='/admin/pizzas' element={<AdminPizzas />} />
                <Route path='/admin/pizzas/new' element={<AdminPizzaPage />} />
                <Route path='/admin/pizzas/:id' element={<AdminPizzaPage/>}/>
                <Route path='/admin/pizzaTypes/new' element={<AdminPizzaTypePage />}/>
                <Route path='/admin/pizzaTypes/:id' element={<AdminPizzaTypePage />}/>
                <Route path='/admin/pizzaTypes' element={<AdminPizzaTypes />}/>
                <Route path='/admin/pizzaToppings/new' element={<AdminPizzaToppingPage />} />
                <Route path='/admin/pizzaToppings/:id' element={<AdminPizzaToppingPage />} />
                <Route path='/admin/pizzaToppings' element={<AdminPizzaToppings />} />
                <Route path='/admin/sideDishes/new' element={<AdminSideDishPage/>}/>
                <Route path='/admin/sideDishes/:id' element={<AdminSideDishPage/>}/>
                <Route path='/admin/sideDishes' element={<AdminSideDishes/>}/>
                <Route path='/admin/sideDishTypes/new' element={<AdminSideDishTypePage/>}/>
                <Route path='/admin/sideDishTypes/:id' element={<AdminSideDishTypePage/>}/>
                <Route path='/admin/sideDishTypes' element={<AdminSideDishTypes/>}/>
                <Route path='/admin/vouchers/new' element={<AdminVoucherPage />}/>
                <Route path='/admin/vouchers/:id' element={<AdminVoucherPage />}/>
                <Route path='/admin/vouchers' element={<AdminVouchers />}/>
                <Route path='/admin/users/new' element={<AdminUserPage/>}/>
                <Route path='/admin/users/:id' element={<AdminUserPage/>}/>
                <Route path='/admin/users' element={<AdminUsers/>}/>
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
