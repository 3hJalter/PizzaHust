import {
  ArrayField,
  Datagrid,
  DeleteButton,
  EditButton,
  ImageField,
  List, NumberField, ReferenceArrayField, ReferenceField, SingleFieldList,
  TextField,
  TextInput,
} from 'react-admin';

import pizzaList from "../pizza/PizzaList.jsx"

const userFilters = [
  <TextInput
    key="q"
    label="Search"
    source="q"
    alwaysOn
    placeholder="Partial name and id"
  />,
];


export default function ComboList(props) {
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
        <ArrayField source="pizzaListId">
          <Datagrid bulkActionButtons={false}>
            <ReferenceField source="_id" reference="pizza">
              <TextField source="name" />
            </ReferenceField>
            <NumberField source="quantity" />
          </Datagrid>
        </ArrayField>
        <ArrayField source="sideDishListId">
          <Datagrid bulkActionButtons={false}>
            <ReferenceField source="_id" reference="sideDish">
              <TextField source="name" />
            </ReferenceField>
            <NumberField source="quantity" />
          </Datagrid>
        </ArrayField>
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
