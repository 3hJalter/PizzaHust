import axios from "axios";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required, ReferenceInput, SelectInput,
} from 'react-admin';
import { useNavigate } from "react-router-dom";

const VITE_APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/pizza";

const PizzaCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (pizzaData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/pizza/add-pizza`,
        pizzaData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("Pizza created successfully!", response);
      navigate(-1);
    } catch (error) {
      alert(`Error creating pizza: ${error.response.data.message}`);
    }
  };

  return (
    <Create title="Upload a pizza" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" fullWidth validate={required()} />
        <NumberInput source={"price"} fullWidth validate={required()} />
        <TextInput source="description" fullWidth validate={required()} />
        <ReferenceInput
          source="pizzaTypeId"
          reference="pizzaType"
          label="Pizza Type"
          perPage={100}
          fullWidth
          validate={required()}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="image" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default PizzaCreate;
