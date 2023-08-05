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
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/pizzaType";

const PizzaTypeCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (pizzaTypeData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/pizzaType/add-pizzaType`,
        pizzaTypeData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("PizzaType created successfully!", response);
      navigate(-1);
    } catch (error) {
      alert(`Error creating pizzaType: ${error.message}`);
    }
  };

  return (
    <Create title="Upload a pizzaType" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" fullWidth validate={required()} />
        <TextInput source="description" fullWidth validate={required()} />
        <TextInput source="image" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default PizzaTypeCreate;
