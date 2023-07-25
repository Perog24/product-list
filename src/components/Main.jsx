import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductsList,
  deleteProductsItem,
} from "../store/slices/products.slice";
import { setCount } from "../store/slices/existCounter.slice";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./Main.module.scss";
import { Outlet, useNavigate, Link } from "react-router-dom";

const Main = () => {
  const products = useSelector((state) => state.products);
  const [productsSortArr, setProductsSortArr] = useState(products);
  const existCount = useSelector((state) => state.existCounter);
  const [screenWidth, setScreenWidth] = useState(window.outerWidth);
  const [screenWidth2, setScreenWidth2] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.outerWidth);
      setScreenWidth2(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setProductsSortArr(products);
    let productExistArray = products.filter((item) => item.exist === true);
    if (productExistArray.length) {
      dispatch(setCount(productExistArray.length));
    } else {
      dispatch(setCount(0));
    }
  }, [products, dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    const newProduct = {
      id: values.id,
      title: values.title,
      content: values.content,
      exist: values.exist,
    };
    let isInProductsList = false;
    products.forEach((product) => {
      if (product.id === newProduct.id || product.title === newProduct.title) {
        isInProductsList = true;
      }
    });
    if (!isInProductsList) {
      dispatch(setProductsList(newProduct));
      resetForm();
      return;
    } else {
      alert("This product already exists");
    }
  };

  const changeDiscription = (id) => {
    navigate(`/product_list/${id}`);
  };

  const productsSortFunc = (sortType) => {
    let productsSortArray = [];
    if (sortType === "All") {
      productsSortArray = products;
    } else if (sortType === "Exist") {
      productsSortArray = products.filter((item) => item.exist === true);
    } else if (sortType === "Not exist") {
      productsSortArray = products.filter((item) => item.exist !== true);
    }
    setProductsSortArr(productsSortArray);
  };

  const showComments = (id) => {
    const chooseProduct = products.find((item) => item.id === id);
    navigate(`/comments/${id}`, { state: { chooseProduct } });
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.linkDiv}>
        <Link to={`/`}>Start page</Link>
        <p> Товару в сховищі: {existCount}</p>
        <select onChange={(e) => productsSortFunc(e.target.value)}>
          <option value="All">All</option>
          <option value="Exist">Exist</option>
          <option value="Not exist">Not Exist</option>
        </select>
      </div>

      <Formik
        initialValues={{
          id: "",
          title: "",
          content: "",
          exist: false,
        }}
        validationSchema={Yup.object().shape({
          id: Yup.number()
            .min(0, "Only positive number")
            .required("ID is required"),
          title: Yup.string().required("Title is required"),
          content: Yup.string().required("Content is required"),
          exist: Yup.boolean().required("Exist is required"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label htmlFor="id">ID:</label>
          <Field type="number" name="id" placeholder="ID number" />
          <ErrorMessage name="id" component="div" />
          <label htmlFor="title">Title:</label>
          <Field type="text" name="title" placeholder="Название" />
          <ErrorMessage name="title" component="div" />
          <label htmlFor="content">Content:</label>
          <Field type="text" name="content" placeholder="Контент" />
          <ErrorMessage name="content" component="div" />
          <label htmlFor="exist">Exist:</label>
          <Field type="checkbox" name="exist" />
          <button type="submit">Добавить</button>
        </Form>
      </Formik>
      {productsSortArr.length > 0 && (
        <div className={styles.prodListDiv}>
          {((screenWidth > 476) && (screenWidth2 > 476)) ? (
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
                {productsSortArr.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index}</td>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.content}</td>
                    <td>{product.exist ? "Есть" : "Нет"}</td>
                    <td>
                      <button onClick={() => changeDiscription(product.id)}>
                        Изменить
                      </button>
                      <button
                        onClick={() => dispatch(deleteProductsItem(product))}
                      >
                        Удалить
                      </button>
                      <button onClick={() => showComments(product.id)}>
                        Show comments
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            productsSortArr.map((product, index) => (
              <div key={product.id}>
                <div className={styles.prodItem}>
                  <h5>ID: {product.id}</h5>
                  <h4>Title: {product.title}</h4>
                  <p>Content: {product.content}</p>
                  <p>Exist: {product.exist ? "Есть" : "Нет"}</p>
                  <div>
                    <button onClick={() => changeDiscription(product.id)}>
                      Изменить
                    </button>
                    <button
                      onClick={() => dispatch(deleteProductsItem(product))}
                    >
                      Удалить
                    </button>
                    <button onClick={() => showComments(product.id)}>
                      Show comments
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Main;
