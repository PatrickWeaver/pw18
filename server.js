var express = require('express');
var app = express();
var history = require('connect-history-api-fallback');

app.use(history());
app.use(express.static('public'));


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
