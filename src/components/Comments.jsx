import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {getComments} from '../store/slices/api.slice';

import styles from './Comments.module.scss';

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.api.comments);
  const location = useLocation();
  const navigate = useNavigate();
  const chooseProduct = location.state?.chooseProduct;
  const users = useSelector((state) => state.api.users);

  useEffect(() => {
    dispatch(getComments(chooseProduct.id));
  }, [dispatch, chooseProduct]);
 
   const userInfo =(id)=>{
        let user = users.find(user => user.id === id);
        if(user)
          navigate(`/userInfo/${(user.name).replace(/\s/g,'_')}`, {state: {userInfo: user}});
   };
  return (
    <>
     <button onClick={()=>navigate(-1)}>Prev</button>
      <h1>Comments</h1>
      <div>
        <h3>{chooseProduct?.title}</h3>
        <p>Id товару: {chooseProduct.id}, Опис: {chooseProduct?.content}</p>
      </div>
      { comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <span>
                <h3 className={styles.email} onClick={()=>userInfo(comment.id)}>{comment.email}</h3>
                <h5>{comment.name}</h5>
              </span>              
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      ): (
        <div>
          <h3>No comments</h3>
        </div>
      )
       
      }
   </>
   )
  }
  export default Comments;