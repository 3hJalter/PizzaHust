import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
} from 'react-admin'

export const listProducts = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='name' />
      <TextField source='brand' />
      <TextField source='price' />

      <EditButton basePath='/products' />
    </Datagrid>
  </List>
)

export const editProduct = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source='name'  name={'name'}/>
      <TextInput source='brand'  name={'brand'}/>
      <TextInput source='price'  name={'price'}/>
    </SimpleForm>
  </Edit>
)

export const createProduct = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='name'  name={'name'}/>
      <TextInput source='brand'  name={'brand'}/>
      <TextInput source='price'  name={'price'}/>
    </SimpleForm>
  </Create>
)
