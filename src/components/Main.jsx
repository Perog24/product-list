import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setProductsList}  from '../store/slices/products.slice';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './Main.module.scss'

const Main = () => {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch();

  const handleSubmit = (values, {resetForm} ) => { 
    const newProduct = {
      id: values.id,
      title: values.title,
      content: values.content,
      exist: values.exist,
    };
    let isInProductsList = false;
    products.forEach((product) => {
      if(product.id === newProduct.id || product.title === newProduct.title ){
        isInProductsList = true;
      }
    })
    if(!isInProductsList) {
    dispatch(setProductsList(newProduct));
      resetForm();    
    return;
    } else {
      alert('This product already exists');
    }   
  };

  const changeDiscription = (index) =>{

  }
  return (
   <div>
   <Formik 
   initialValues={{
      id: '',
      title: '',
      content: '',
      exist: false,
    }}
   validationSchema={Yup.object().shape({
      id: Yup.number().min(0, 'Only positive number').required('ID is required'),
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      exist: Yup.boolean().required('Exist is required'),
   })}
   onSubmit= {handleSubmit}
   >
      <Form className={styles.form}>
         <label for="id">ID:</label>
         <Field 
         type='number'
         name="id"
         placeholder="ID number"/>
         <ErrorMessage name="id" component='div' />
         <label for="title">Title:</label>
        <Field
          type="text"
          name="title"
          placeholder="Название" />
        <ErrorMessage name="title" component='div' />
        <label for="content">Content:</label>
        <Field
          type="text"
          name="content"
          placeholder="Контент" />
        <ErrorMessage name="content" component='div' />
        <label for="exist">Exist:</label>
        <Field
          type="checkbox"
          name="exist" />
        <button type="submit">Добавить</button>
      </Form>
   </Formik>
   {products.length > 0 && (
      <table className={styles.prodListTable}>
         <thead>
            <tr>
               <th>ID</th>
               <th>Название</th>
               <th>Контент</th>
               <th>Наличие</th>
               <th>Действия</th>
            </tr>
         </thead>
         <tbody>
            {products.map(product => (      
               <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.content}</td>
                  <td>{product.exist ? 'Есть': 'Нет'}</td>
                  <td>
                     <button onClick={changeDiscription(product.id)}>Изменить</button>
                     <button onClick={() => dispatch(setProductsList(product))}>Удалить</button>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>      
    )}
   
   </div>
  );
};

export default Main;