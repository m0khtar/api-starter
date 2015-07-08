var express = require('./config/express'),
	mongoose = require('./config/mongoose');

var db = mongoose();
var app = express();

process.on('uncaughtException', function(err) {
    console.log(err);
})

app.listen(app.get('port'), function() {
	console.log('Express server running on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;