import axios from 'axios';

export const getOrders = () => {
  axios.get('http://localhost:6001/api/square/orders')
    .then(res => {
      console.log('endpoint orders', res.data.orders)
      return res.data.orders;
    })
    .catch(err => {
      console.log(err)
      return err;
    })
}