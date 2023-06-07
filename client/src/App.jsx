import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/account' element={<ProfilePage />} />
                <Route path='*' element={<NotFound />} />
              </Route>
              <Route path='/admin' element={<AdminLayout/>}>
                <Route index element={<AdminPage />} />
                <Route path='/admin/orders' element={<AdminOrders />} />
                <Route path='/admin/combos' element={<AdminCombos />} />
                <Route path='/admin/combos/:id' element={<AdminComboPage/>}/>
                <Route path='/admin/pizzas' element={<AdminPizzas />} />
                <Route path='/admin/pizzaTypes' element={<AdminPizzaTypes />}/>
                <Route path='/admin/pizzaToppings' element={<AdminPizzaToppings />} />
                <Route path='/admin/sideDishes' element={<AdminSideDishes/>}/>
                <Route path='/admin/sideDishTypes' element={<AdminSideDishTypes/>}/>
                <Route path='/admin/vouchers' element={<AdminVouchers />}/>
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
