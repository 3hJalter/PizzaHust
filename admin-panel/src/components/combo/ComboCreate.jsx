import axios from "axios";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator,
} from 'react-admin';
import { useNavigate } from "react-router-dom";

const VITE_APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/combo";

const ComboCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (comboData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/combo/add-combo`,
        comboData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("Combo created successfully!", response);
      navigate(-1);
    } catch (error) {
      alert(`Error creating combo: ${error.response.data.message}`);
    }
  };

  const validateNumberGreaterThanZero = (value) => {
    if (value <= 0) {
      return "Value must be greater than 0";
    }
    return undefined;
  };

  return (
    <Create title="Upload a combo" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" fullWidth validate={required()} />
        <NumberInput source="price" fullWidth validate={validateNumberGreaterThanZero} />
        <TextInput source="description" fullWidth validate={required()} />
        <ArrayInput source="pizzaListId">
          <SimpleFormIterator>
            <ReferenceInput source="_id" reference="pizza">
              <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="quantity" validate={validateNumberGreaterThanZero}/>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="sideDishListId">
          <SimpleFormIterator>
            <ReferenceInput source="_id" reference="sideDish">
              <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="quantity" validate={validateNumberGreaterThanZero}/>
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="image" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default ComboCreate;
