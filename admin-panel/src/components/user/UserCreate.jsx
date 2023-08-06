import axios from "axios";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required, DateInput, SelectInput,
} from 'react-admin';
import { useNavigate } from "react-router-dom";

const VITE_APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/user";

const UserCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/user/register`,
        userData
      );
      console.log("User created successfully!", response);
      navigate(-1);
    } catch (err) {
      alert("Error creating user: username already taken!");
    }
  };

  return (
    <Create title="Upload a user" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" fullWidth validate={required()} />
        <TextInput source="username" fullWidth validate={required()} />
        <TextInput source="password" fullWidth validate={required()} />
        <DateInput source="birth" fullWidth validate={required()} />
        <TextInput source="email" fullWidth validate={required()} />
        <TextInput source="phone" fullWidth validate={required()} />
        <TextInput source="address" fullWidth validate={required()} />
        <TextInput source="description" fullWidth />
        <SelectInput source="role" fullWidth choices={[
          { id: 'Admin', name: 'Admin' },
          { id: 'Customer', name: 'Customer' },
        ]} validate={required()}/>
        <TextInput source="image" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
