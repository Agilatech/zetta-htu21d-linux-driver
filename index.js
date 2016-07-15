const Scout = require('zetta-scout');
const util = require('util');
const Htu21d = require('./htu21d');

const Htu21dScout = module.exports = function() {
  Scout.call(this);
};

util.inherits(Htu21dScout, Scout);

Htu21dScout.prototype.init = function(next) {

  const self = this;

  const query = this.server.where({type: 'HTU21D_Sensor'});
  const options = {"bus": '/dev/i2c-2', "chronPeriod": 60000, "streamPeriod": 10000};

  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], Htu21d, options);
    } else {
      self.discover(Htu21d, options);
    }
  });

  next();

};
