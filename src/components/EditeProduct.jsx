// EditProduct.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editeProductsList } from '../store/slices/products.slice';

import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = ({ onClose }) => {
   const {id} = useParams()
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const editingProduct = products.find((product) => product.id === parseInt(id));
  const [editedTitle, setEditedTitle] = useState(editingProduct?.title);
  const [editedContent, setEditedContent] = useState(editingProduct?.content);
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    const updatedProduct = {
      ...editingProduct,
      title: editedTitle,
      content: editedContent,
    };
    
    dispatch(editeProductsList(updatedProduct));
    navigate('/product_list');
  }

  if (editingProduct){
  return (
    <div className="edit-product-modal">
      <div className="edit-product-content">
        <h2>Edit Product</h2>
        <label htmlFor="editedTitle">Title:</label>
        <input
          type="text"
          name="editedTitle"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <label htmlFor="editedContent">Content:</label>
        <input
          type="text"
          name="editedContent"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <button onClick={()=>handleSaveChanges()}>Save Changes</button>
        <button onClick={()=>navigate(-1)}>Cancel</button>
      </div>
    </div>    
  );}
  return <div>Product not found</div>;
};

export default EditProduct;
