import axios from "axios";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required, SelectInput,
} from 'react-admin';
import { useNavigate } from "react-router-dom";

const VITE_APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8001/voucher";

const VoucherCreate = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (voucherData) => {
    try {
      const response = await axios.post(
        `${VITE_APP_BASE_URL}/voucher/add-voucher`,
        voucherData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("Voucher created successfully!", response);
      navigate(-1);
    } catch (error) {
      alert(`Error creating voucher: ${error.response.data.message}`);
    }
  };

  return (
    <Create title="Upload a voucher" {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <NumberInput source="discount" fullWidth validate={required()} />
        <TextInput source="description" fullWidth />
        <NumberInput source="priceRequired" fullWidth validate={required()} />
        <TextInput source="name" fullWidth validate={required()} />
        <SelectInput source="type" fullWidth choices={[
          { id: 'minus', name: 'minus' },
          { id: 'percent', name: 'percent' },
        ]} validate={required()}/>
        <TextInput source="image" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default VoucherCreate;
