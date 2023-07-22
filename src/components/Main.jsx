import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setProductsList, deleteProductsItem}  from '../store/slices/products.slice';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './Main.module.scss'
import { Outlet, useNavigate } from 'react-router-dom';

const Main = () => {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch(); 
  const navigate = useNavigate()



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

  const changeDiscription = (id) =>{
      navigate(  `/product_list/${id}`) 
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
         <label htmlFor="id">ID:</label>
         <Field 
         type='number'
         name="id"
         placeholder="ID number"/>
         <ErrorMessage name="id" component='div' />
         <label htmlFor="title">Title:</label>
        <Field
          type="text"
          name="title"
          placeholder="Название" />
        <ErrorMessage name="title" component='div' />
        <label htmlFor="content">Content:</label>
        <Field
          type="text"
          name="content"
          placeholder="Контент" />
        <ErrorMessage name="content" component='div' />
        <label htmlFor="exist">Exist:</label>
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
               <th>№</th>
               <th>ID</th>
               <th>Название</th>
               <th>Контент</th>
               <th>Наличие</th>
               <th>Действия</th>
            </tr>
         </thead>
         <tbody>
            {products.map((product, index) => (      
               <tr key={product.id}>
                  <td>{index}</td>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.content}</td>
                  <td>{product.exist ? 'Есть': 'Нет'}</td>
                  <td>
                     <button onClick={()=>changeDiscription(product.id)}>Изменить</button>
                     <button onClick={() => dispatch(deleteProductsItem(product))}>Удалить</button>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>      
    )}
   
        <Outlet />
   
   </div>
  );
};

export default Main;
