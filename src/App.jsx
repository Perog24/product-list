import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { getUsers} from './store/slices/api.slice';
import { setIsLogined } from './store/slices/isLogin.slice';

import './App.css';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(2,"To Short").max(30, "To Long").required('Username is required'),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  
});

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.api.users);
  const isLogined = useSelector((state) => state.isLogined);
  const navigate = useNavigate()

  useEffect(() => {
    let isLogined1 = localStorage.getItem('loggedIn');
    if (isLogined1) {
      dispatch(setIsLogined(isLogined1 ==='true'));
    } else {
      dispatch(setIsLogined(false));
    }

  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  const handleSubmite = (values) =>{
    const {username, email} = values;
    const matchedUser = users.find((user) => user.username === username && user.email === email);
    if(matchedUser) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', username);
      dispatch(setIsLogined(true));
    } else{
      localStorage.setItem('loggedIn', 'false');
      localStorage.removeItem('username')
      dispatch(setIsLogined(false));
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    dispatch(setIsLogined(false));
  }

  const startApp = () => {
      navigate('product_list')
  };

 if (!isLogined) {
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
            <button type="submit">Log In</button>
          </Form>
        </Formik>
      </div>  
  );
} else {
  return (
    <div className="App">
      <h1>Product list</h1>
      <p>Welcome, {localStorage.getItem('username')}!</p>
      <button onClick={handleLogOut}>Logout</button>
      <button onClick={startApp}>Let start</button>
     
    </div>
  );
  }
}
export default App;
