import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource, defaultTheme, fetchUtils } from "react-admin";
import "./App.css";
import authProvider from "./authProvider";
import UserCreate from "./components/user/UserCreate";
import UserEdit from "./components/user/UserEdit";
import UserList from "./components/user/UserList";

import VoucherList from './components/voucher/VoucherList.jsx';
import VoucherEdit from './components/voucher/VoucherEdit.jsx';
import VoucherCreate from './components/voucher/VoucherCreate.jsx';

import PizzaToppingList from './components/pizzaTopping/pizzaToppingList.jsx';
import PizzaToppingEdit from './components/pizzaTopping/pizzaToppingEdit.jsx';
import PizzaToppingCreate from './components/pizzaTopping/PizzaToppingCreate.jsx';

import OrderList from './components/order/OrderList.jsx';
import OrderEdit from './components/order/OrderEdit.jsx';

import theme from "./themes/mui";
import { MyLayout } from './components/MyLayout.jsx';

const VITE_APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001";

const lightTheme = { ...defaultTheme, ...theme };
const darkTheme = { ...defaultTheme, ...theme, palette: { mode: "dark" } };

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

function App() {
  return (
    <Admin
      theme={lightTheme}
      darkTheme={darkTheme}
      authProvider={authProvider}
      dataProvider={simpleRestProvider(VITE_APP_BASE_URL, httpClient)}
      layout={MyLayout}
    >
      <Resource
        name="user"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
      />
      <Resource
        name="voucher"
        list={VoucherList}
        create={VoucherCreate}
        edit={VoucherEdit}
      />
      <Resource
        name="pizzaTopping"
        list={PizzaToppingList}
        create={PizzaToppingCreate}
        edit={PizzaToppingEdit}
      />
      <Resource
        name="order"
        list={OrderList}
        edit={OrderEdit}
      />
    </Admin>
  );
}

export default App;
