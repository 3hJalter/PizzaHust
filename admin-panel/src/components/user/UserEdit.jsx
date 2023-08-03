import { Typography } from "@mui/material";
import {
  ArrayInput,
  AutocompleteInput,
  Edit,
  FormTab,
  NumberInput,
  ReferenceInput,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
  required, DateField, DateInput, SelectInput,
} from 'react-admin';

const userDefaultValue = () => ({ targetId: "", targetIndex: null });

const UserEdit = (props) => {
  return (
    <Edit
      title="Edit the user"
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
          <TextInput source="username" fullWidth validate={required()} />
          <DateInput source="birth" fullWidth validate={required()} />
          <TextInput source="email" fullWidth validate={required()} />
          <TextInput source="phone" fullWidth validate={required()} />
          <TextInput source="address" fullWidth validate={required()} />
          <TextInput source="description" fullWidth />
          <SelectInput source="role" fullWidth choices={[
            { id: 'admin', name: 'Admin' },
            { id: 'customer', name: 'Customer' },
          ]} validate={required()}/>
          <TextInput source="image" fullWidth validate={required()} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default UserEdit;
