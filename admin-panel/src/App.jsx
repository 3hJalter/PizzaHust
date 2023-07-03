import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource, defaultTheme, fetchUtils } from "react-admin";
import "./App.css";
import authProvider from "./authProvider";
import CourseCreate from "./components/course/CourseCreate";
import CourseEdit from "./components/course/CourseEdit";
import CourseList from "./components/course/CourseList";
import LessonCreate from "./components/lesson/LessonCreate";
import LessonEdit from "./components/lesson/LessonEdit";
import LessonList from "./components/lesson/LessonList";
import UserCreate from "./components/user/UserCreate";
import UserEdit from "./components/user/UserEdit";
import UserList from "./components/user/UserList";
import theme from "./themes/mui";

const VITE_APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/";

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
    >
      <Resource
        name="user"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
      />
      {/*<Resource*/}
      {/*  name="courses"*/}
      {/*  list={CourseList}*/}
      {/*  create={CourseCreate}*/}
      {/*  edit={CourseEdit}*/}
      {/*/>*/}
      {/*<Resource*/}
      {/*  name="lessons"*/}
      {/*  list={LessonList}*/}
      {/*  create={LessonCreate}*/}
      {/*  edit={LessonEdit}*/}
      {/*/>*/}
    </Admin>
  );
}

export default App;
