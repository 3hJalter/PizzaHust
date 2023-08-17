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

export default function PizzaList(props) {
  return (
    <List filters={userFilters} {...props}>
      <Datagrid>
        {/*<TextField source="id" />*/}
        <ImageField
          source="image"
          sx={{
            "& img": { maxWidth: 100, maxHeight: 100, objectFit: "cover" },
          }}
        />
        <TextField source="name" />
        <NumberField source="price" />
        <ReferenceField source="pizzaTypeId" reference="pizzaType">
          <TextField source="name" />
        </ReferenceField>
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
