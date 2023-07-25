import { useLocation, useNavigate} from "react-router-dom";

import styles from './UserInfo.module.scss'

const UserInfo = () => {
const location = useLocation();
const navigate = useNavigate();
const user = location.state.userInfo;
   return (
      <div className={styles.userInfoWrapper}>
         <button onClick={()=>navigate(-1)}>Prev</button>
         <div className={styles.userInfo}>
            <h1>UserInfo</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Web: {user.website}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address.street} {user.address.suite}, {user.address.city}</p>
            <p>Company: {user.company.name}</p>            
         </div>
      </div>

   )
   }
   export default UserInfo;