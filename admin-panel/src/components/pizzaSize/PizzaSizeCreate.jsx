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
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/pizzaSize";

const PizzaSizeCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (pizzaSizeData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/pizzaSize/add-pizza-size`,
        pizzaSizeData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("PizzaSize created successfully!", response);
      navigate(-1);
    } catch (error) {
      alert(`Error creating pizzaSize: ${error.response.data.message}`);
    }
  };

  return (
    <Create title="Upload a pizzaSize" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" fullWidth validate={required()} />
        <NumberInput source="priceMultiple" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default PizzaSizeCreate;
