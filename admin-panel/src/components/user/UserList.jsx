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

export default function UserList(props) {
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
        <TextField source="email" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
