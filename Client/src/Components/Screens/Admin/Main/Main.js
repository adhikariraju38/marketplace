import React,{useContext,useEffect} from 'react';
import AdminContext from '../context/AdminContext';

function Main() {
  const { products,getProducts,testFarmer, getTestFarmer,users,getUsers } = useContext(AdminContext);
  useEffect(
    () => {
      getProducts()
      getTestFarmer()
      getUsers()
      }
  , // eslint-disable-next-line
    []
  );
  const totalUsers=users.length;
  const productsLive=products.length;
  const totalConsumers=testFarmer.length;
  return (
    <main className='admin'>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
        </div>
      </div>

      <ul className="box-info">
        <li>
        <i className='bx bxs-group' ></i>
          
          <span className="text">
            <h3>{totalConsumers}</h3>
            <p>Total Consumers</p>
          </span>
        </li>
        <li>
        <i className='bx bxs-cube' ></i>
          <span className="text">
            <h3>{productsLive}</h3>
            <p>Total Products Live</p>
          </span>
        </li>
        <li>
        <i className='bx bxs-group' ></i>
          <span className="text">
            <h3>{totalUsers}</h3>
            <p>Total Users</p>
          </span>
        </li>
      </ul>
    </main>
  );
}

export default Main;
