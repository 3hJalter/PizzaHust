import { Typography } from "@mui/material";
import {
  Edit,
  FormTab,
  NumberInput,
  TabbedForm,
  TextInput,
  required, SelectInput,
} from 'react-admin';

const userDefaultValue = () => ({ targetId: "", targetIndex: null });

const VoucherEdit = (props) => {
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
          <NumberInput source="discount" fullWidth validate={required()} />
          <TextInput source="description" fullWidth />
          <NumberInput source="priceRequired" fullWidth validate={required()} />
          <TextInput source="name" fullWidth validate={required()} />
          <SelectInput source="type" fullWidth choices={[
            { id: 'Minus', name: 'minus' },
            { id: 'Percent', name: 'percent' },
          ]} validate={required()}/>
          <TextInput source="image" fullWidth validate={required()} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default VoucherEdit;
