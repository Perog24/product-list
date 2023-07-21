import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { getUsers} from './store/slices/api.slice';
import './App.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(2,"To Short").max(30, "To Long").required('Username is required'),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  
});

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.api.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  const handleSubmite = (values) =>{
    
  };

 console.log(users);
  return (  
      <div className="App">
        <h1>Product list</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleSubmite(values);
          }}
          >
          <Form>
            <label htmlFor='username'>User name:</label>
            <Field name="username" type="text" placeholder="Username" />
            <ErrorMessage name='username' component="div"/>
            <label htmlFor='email'>Email:</label>
            <Field name="email" type="text" placeholder="Email" />
            <ErrorMessage name='email' component="div"/>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>

    
  );
}

export default App;
