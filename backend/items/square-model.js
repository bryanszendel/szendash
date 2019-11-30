




function getLocations() {

  var SquareConnect = require('square-connect');
  var client = SquareConnect.ApiClient.instance;
  // Set sandbox url
  client.basePath = 'https://connect.squareupsandbox.com';
  // Configure OAuth2 access token for authorization: oauth2
  var oauth2 = client.authentications['oauth2'];
  // Set sandbox access token
  oauth2.accessToken = process.env.SQUARE_ACCESS;
  // Pass client to API
  var api = new SquareConnect.LocationsApi();

  api.listLocations()
  .then(function(data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data, 0, 1));
  }, function(error) {
    console.error(error);
  }
  );
}

module.exports = {
  getLocations
}