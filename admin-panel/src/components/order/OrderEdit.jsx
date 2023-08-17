import { Edit, required, SelectInput, SimpleForm } from 'react-admin';

const OrderEdit = (props) => {
  return (
    <Edit title="Edit the order" {...props}>
      <SimpleForm>
        <SelectInput source="orderStatus" fullWidth choices={[
          { id: 'Reject', name: 'Reject' },
          { id: 'Pending', name: 'Pending' },
          { id: "Done", name: 'Done' },
          { id: "Delivery", name: 'Delivery' },
        ]} validate={required()}/>
      </SimpleForm>
    </Edit>
  );
};

export default OrderEdit;
