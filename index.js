/*
 Copyright © 2016 Agilatech. All Rights Reserved.
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var options = require('./options');

const Scout = require('zetta-scout');
const util = require('util');
const Htu21d = require('./htu21d');

const Htu21dScout = module.exports = function(opts) {
  
  // see if any of the options were overridden in the server

  if (typeof opts !== 'undefined') {
    if (typeof opts['bus'] !== 'undefined') {
      options['bus'] = opts['bus'];
    }
    
    if (typeof opts['chronPeriod'] !== 'undefined') {
      options['chronPeriod'] = opts['chronPeriod'];
    }
    
    if (typeof opts['streamPeriod'] !== 'undefined') {
      options['streamPeriod'] = opts['streamPeriod'];
    }
  }
  
  Scout.call(this);
};

util.inherits(Htu21dScout, Scout);

Htu21dScout.prototype.init = function(next) {

  const self = this;

  const query = this.server.where({type: 'HTU21D_Sensor'});

  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], Htu21d, options);
    } else {
      self.discover(Htu21d, options);
    }
  });

  next();

};
