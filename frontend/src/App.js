import React, {useState, useEffect} from 'react';
import './App.css';
// import Dashboard from './components/Dashboard';
// import {getOrders} from './utils/endpoints.js';
import axios from 'axios';
const loader = require('./assets/spinning-circles.svg')

const App = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getOrders = () => {
    axios.get('http://localhost:6001/api/square/orders')
      .then(res => {
        console.log('endpoint orders', res.data)
        setOrders(res.data);
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
  }, [])

  useEffect(() => {
    if (orders[0]) {
      setIsLoading(false)
    }
    console.log('isLoading', isLoading)
  }, [orders])

  const nestedTotals = orders.map((order, index) => {
    return order.total_money.amount
  })

  const totalCollected = nestedTotals.reduce(function(total, num) {
    return total + num;
  }, 0)

  function currencyFormatter(num) {
    let baseNum = num.toString().slice(0, -2);
    let decimals = num.toString().slice(-2);
    return `$${baseNum}.${decimals}`
  }

  return (
    <div className="App">
      <h1>{isLoading === true ? <img src={loader} alt='loading' /> : currencyFormatter(totalCollected)}</h1>
      {/* {orders.map((order, index) => {
        return (
          <p key={index}>{order.id}</p>
        )
      })} */}
    </div>
  );
}

export default App;
