import { Typography } from "@mui/material";
import {
  Edit,
  FormTab,
  NumberInput,
  TabbedForm,
  TextInput,
  required, ReferenceInput, SelectInput,
} from 'react-admin';

const userDefaultValue = () => ({ targetId: "", targetIndex: null });

const SideDishEdit = (props) => {
  return (
    <Edit
      title="Edit the sideDish "
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
          <NumberInput source={"price"} fullWidth validate={required()} />
          <TextInput source="description" fullWidth validate={required()} />
          <ReferenceInput
            source="sideDishTypeId"
            reference="sideDishType"
            label="Side Dish Type"
            perPage={100}
            fullWidth
            validate={required()}
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput source="image" fullWidth validate={required()} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default SideDishEdit;
