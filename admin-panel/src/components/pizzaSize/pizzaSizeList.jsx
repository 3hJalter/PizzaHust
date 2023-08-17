import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  ImageField,
  List,
  NumberField,
  TextField,
  TextInput,
} from "react-admin";

const userFilters = [
  <TextInput
    key="q"
    label="Search"
    source="q"
    alwaysOn
    placeholder="Partial name and id"
  />,
];

export default function PizzaSizeList(props) {
  return (
    <List filters={userFilters} {...props}>
      <Datagrid>
        {/*<TextField source="id" />*/}
        <TextField source="name" />
        <NumberField source="priceMultiple" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
