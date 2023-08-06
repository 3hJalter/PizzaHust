import {
  ArrayField,
  List,
  Datagrid,
  NumberField,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  useRecordContext, ReferenceField,
} from 'react-admin';

const OrderList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="userId" reference="user">
          <TextField source="username" />
        </ReferenceField>
        <TextField source="phone" />
        <TextField source="address" />
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
        <HideEditButtonBasedOnStatus />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

const HideEditButtonBasedOnStatus = () => {
  const record = useRecordContext();

  // Check if the orderStatus is "Done" and hide the EditButton accordingly
  if (record && record.orderStatus === "Done") {
    return null; // Return null to hide the EditButton
  }

  return <EditButton />;
};

export default OrderList;
