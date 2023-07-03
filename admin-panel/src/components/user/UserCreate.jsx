import axios from "axios";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";
import { useNavigate } from "react-router-dom";

const VITE_APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/user";

const UserCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/upload`,
        userData
      );
      console.log("User created successfully!", response);
      navigate(-1);
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <Create title="Upload a user" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="playlistUrl" fullWidth validate={required()} />
        <NumberInput source="price" fullWidth validate={required()} />
        <TextInput
          source="coverImage"
          fullWidth
          helperText="By default, the cover image will be the image of the playlist."
        />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
