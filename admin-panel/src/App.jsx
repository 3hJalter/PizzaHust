import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource, defaultTheme, fetchUtils } from "react-admin";
import "./App.css";
import authProvider from "./authProvider";
import UserCreate from "./components/user/UserCreate";
import UserEdit from "./components/user/UserEdit";
import UserList from "./components/user/UserList";
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
    </Admin>
  );
}

export default App;
