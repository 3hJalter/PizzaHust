import {
  ArrayField,
  List,
  Datagrid,
  NumberField,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

const OrderList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="userId" />
        <ArrayField source="productList">
          <Datagrid bulkActionButtons={false}>
            <TextField source="name" />
            <NumberField source="price" />
            <NumberField source="quantity" />
          </Datagrid>
        </ArrayField>
        <NumberField source="finalPrice" />
        <TextField source="orderStatus" />
        <DateField source="createdAt" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default OrderList;
