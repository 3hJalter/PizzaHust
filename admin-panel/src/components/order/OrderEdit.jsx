import { Edit, required, SelectInput, SimpleForm } from 'react-admin';

const OrderEdit = (props) => {
  return (
    <Edit title="Edit the order" {...props}>
      <SimpleForm>
        <SelectInput source="status" fullWidth choices={[
          { id: 'Pending', name: 'pending' },
          { id: "Done", name: 'done' },
        ]} validate={required()}/>
      </SimpleForm>
    </Edit>
  );
};

export default OrderEdit;
