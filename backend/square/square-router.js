const router = require('express').Router();

router.get('/orders', (req, res) => {
  var SquareConnect = require('square-connect');
  var defaultClient = SquareConnect.ApiClient.instance;
  defaultClient.basePath = process.env.SQUARE_BASE_PATH;
  // Configure OAuth2 access token for authorization: oauth2
  var oauth2 = defaultClient.authentications['oauth2'];
  oauth2.accessToken = process.env.SQUARE_ACCESS;
  // console.log('ACCESS', oauth2.accessToken)

  var apiInstance = new SquareConnect.OrdersApi();

  var body = new SquareConnect.SearchOrdersRequest(); // SearchOrdersRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.
  body.location_ids = [process.env.SQUARE_LOCATION_ID]
  body.query = {
    filter: {
      date_time_filter: {
        created_at: {
          start_at: '2019-01-01T00:00:00-00:00', 
          end_at: '2019-12-31T11:59:00-00:00'}
        },
      },
      sort: {
        sort_field: 'CREATED_AT'
      }
    }
  apiInstance.searchOrders(body)
    .then(data => {
      // const accumulator = data;
      console.log(data)
      console.log('API called successfully. Returned data: ' + data);
      if (data.cursor) {
        body.cursor = data.cursor;
        apiInstance.searchOrders(body)
          .then(newData => {
            const response = data.orders.concat(newData.orders)
            console.log('RESPONSE', response)
            res.status(200).json(response)
          })
          .catch(error => {
            console.error(error)
            res.status(500).json({message: 'error retrieving the data.'})
          })
      } else res.status(200).json(data)
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({message: 'error retrieving the data.'})
    })
  })

  module.exports = router;