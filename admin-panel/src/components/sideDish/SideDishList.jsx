import {
  Datagrid,
  DeleteButton,
  EditButton,
  ImageField,
  List, NumberField, ReferenceField,
  TextField,
  TextInput,
} from 'react-admin';

const userFilters = [
  <TextInput
    key="q"
    label="Search"
    source="q"
    alwaysOn
    placeholder="Partial name and id"
  />,
];

export default function SideDishList(props) {
  return (
    <List filters={userFilters} {...props}>
      <Datagrid>
        <TextField source="id" />
        <ImageField
          source="image"
          sx={{
            "& img": { maxWidth: 100, maxHeight: 100, objectFit: "cover" },
          }}
        />
        <TextField source="name" />
        <NumberField source="price" />
        <ReferenceField source="sideDishTypeId" reference="sideDishType">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="description" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
