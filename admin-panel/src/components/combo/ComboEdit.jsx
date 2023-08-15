import { Typography } from "@mui/material";
import {
  Edit,
  FormTab,
  NumberInput,
  TabbedForm,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin';

const userDefaultValue = () => ({ targetId: "", targetIndex: null });

const ComboEdit = (props) => {

  const validateNumberGreaterThanZero = (value) => {
    if (value <= 0) {
      return "Value must be greater than 0";
    }
    return undefined;
  };

  return (
    <Edit
      title="Edit the combo "
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
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default ComboEdit;
