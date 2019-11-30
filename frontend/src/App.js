import React, {useState, useEffect} from 'react';
import './App.css';
// import Dashboard from './components/Dashboard';
// import {getOrders} from './utils/endpoints.js';
import axios from 'axios';

function App() {
  const [orders, setOrders] = useState([])

  const getOrders = () => {
    axios.get('http://localhost:6001/api/square/orders')
      .then(res => {
        console.log('endpoint orders', res.data.orders)
        setOrders(res.data.orders);
      })
      .catch(err => {
        console.log(err)
        return err;
      })
  }
  
  useEffect(() => {
    console.log('starting')
    getOrders()
    console.log('ORDERS', orders)
  }, [orders])

  return (
    <div className="App">
      {orders.map(order => {
        return (
          <p>{order.id}</p>
        )
      })}
    </div>
  );
}

export default App;
