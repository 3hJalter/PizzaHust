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
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/sideDishType";

const SideDishTypeCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (sideDishTypeData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/sideDishType/add-side-dish`,
        sideDishTypeData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("SideDishType created successfully!", response);
      navigate(-1);
    } catch (error) {
      alert(`Error creating sideDishType: ${error.response.data.message}`);
    }
  };

  return (
    <Create title="Upload a sideDishType" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" fullWidth validate={required()} />
        <TextInput source="description" fullWidth validate={required()} />
        <TextInput source="image" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default SideDishTypeCreate;
