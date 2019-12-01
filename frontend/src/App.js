import React, {useState, useEffect} from 'react';
import './App.css';
// import Dashboard from './components/Dashboard';
// import {getOrders} from './utils/endpoints.js';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card,
  CardContent,
  CardActions,
  Container
} from '@material-ui/core';
import axios from 'axios';
const loader = require('./assets/spinning-circles.svg')

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.typography.h4,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    maxWidth: 320,
    minWidth: 275,
    height: 150,
    margin: 25
  },
}));

const App = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const classes = useStyles();

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
    if (num.length <= 5) {
      let baseNum = num.toString().slice(0, -2);
      let decimals = num.toString().slice(-2);
      return `$${baseNum}.${decimals}`
    } else {
      let baseThousands = num.toString().slice(-8, -5);
      let baseHundreds = num.toString().slice(-5, -2);
      let decimals = num.toString().slice(-2);
      return `$${baseThousands},${baseHundreds}.${decimals}`
    }
  }

  return (
    <div className="App">
      <Container className={classes.container}>
        <Card raised className={classes.card}>
          <CardContent>
            <div
              className={classes.root}
            >
              YTD Revenue
            </div>
            <div 
              className={classes.root}>
              {isLoading === true ? 
              <img src={loader} alt='loading' /> : 
              currencyFormatter(totalCollected)}
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
