import { Typography } from "@mui/material";
import {
  Edit,
  FormTab,
  NumberInput,
  TabbedForm,
  TextInput,
  required,
} from 'react-admin';

const userDefaultValue = () => ({ targetId: "", targetIndex: null });

const PizzaToppingEdit = (props) => {
  return (
    <Edit
      title="Edit the pizza topping"
      // mutationMode="pessimistic"
      {...props}
    >
      <TabbedForm defaultValues={userDefaultValue} shouldUnregister>
        <FormTab label="Summary">
          <Typography variant="h6" sx={{ mb: 2.5 }}>
            User Summary
          </Typography>
          <TextInput source="id" fullWidth disabled />
          <TextInput source="name" fullWidth validate={required()} />
          <NumberInput source="price" fullWidth validate={required()} />
          <TextInput source="image" fullWidth validate={required()} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default PizzaToppingEdit;
