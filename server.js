const ENV = process.env.ENV;
if (ENV != 'GLITCH') {
	require('dotenv').config()
}

const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');

app.use(history());
app.use(express.static('public'));

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
