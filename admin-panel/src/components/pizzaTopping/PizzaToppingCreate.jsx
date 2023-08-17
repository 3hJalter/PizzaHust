import axios from "axios";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { useNavigate } from "react-router-dom";

const VITE_APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/pizzaTopping";

const PizzaToppingCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (pizzaToppingData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/pizzaTopping/add-pizza-topping`,
        pizzaToppingData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("PizzaTopping created successfully!", response);
      navigate(-1);
    } catch (error) {
      alert(`Error creating pizzaTopping: ${error.response.data.message}`);
    }
  };

  return (
    <Create title="Upload a pizzaTopping" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" fullWidth validate={required()} />
        <NumberInput source="price" fullWidth validate={required()} />
        <TextInput source="image" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default PizzaToppingCreate;
