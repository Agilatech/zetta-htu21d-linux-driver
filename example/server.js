var zetta = require('zetta');
var th_sensor = require('../index');
var app = require('./apps/htu21d_app');

zetta()
	.name('Zetta Server for HTU21D')
	.use(th_sensor)
    .use(app)
	.listen(1337, function() {
		console.log('Zetta HTU21D Server running on port 1337');
	});
