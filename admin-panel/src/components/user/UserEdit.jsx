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
  required,
} from "react-admin";

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
          <TextInput source="_id" fullWidth disabled />
          <TextInput source="name" fullWidth validate={required()} />
          <NumberInput source="price" fullWidth validate={required()} />
          <TextInput source="coverImage" fullWidth validate={required()} />
          <TextInput source="description" fullWidth multiline />
        </FormTab>

        <FormTab label="Lessons">
          <Typography variant="h6" sx={{ mb: 2.5 }}>
            List of Linked Lessons
          </Typography>
          <ArrayInput source="lessons">
            <SimpleFormIterator
              fullWidth
              getItemLabel={(index) => `Index #${index + 1}.`}
            >
              <ReferenceInput source="_id" reference="lessons">
                <AutocompleteInput
                  fullWidth
                  optionText={(record) => `${record.name} ${record._id}`}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </ReferenceInput>
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>

        <FormTab label="Position">
          <Typography variant="h6" sx={{ mb: 2.5 }}>
            Insert linked/unlinked lesson <strong>BEFORE</strong> #[index]
          </Typography>
          <Typography variant="body1" sx={{ mb: 2.5 }}>
            Choose a lesson
          </Typography>
          <ReferenceInput source="targetId" reference="lessons">
            <AutocompleteInput
              fullWidth
              optionText={(record) => `${record.name} ${record._id}`}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
            />
          </ReferenceInput>
          <NumberInput source="targetIndex" fullWidth />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default UserEdit;
