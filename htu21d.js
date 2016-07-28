/*
 Copyright © 2016 Agilatech. All Rights Reserved.
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const device = require('zetta-device');
const sensor = require('@agilatech/htu21d');
const util = require('util');

var htu21d = module.exports = function(options) {
  device.call(this);

  this.options = options || {};
  this.i2cbus  = this.options['bus'] || "/dev/i2c-1";
  this.addr    =  0x40;
  this.chronPeriod  = this.options['chronPeriod']  || 60000; //milliseconds
  this.streamPeriod = this.options['streamPeriod'] || 10000;

  this.temperature       = 0;
  this.temperatureStream = 0;
  this.humidity          = 0;
  this.humidityStream    = 0;
  this._chron       = null;
  this._streamHum   = null;
  this._streamTemp  = null;

  this.htu21d_sensor = new sensor.Htu21d(this.i2cbus, this.addr);
};

util.inherits(htu21d, device);

htu21d.prototype.init = function(config) {

  config
        .type('HTU21D_Sensor')
        .state('chron-off')
        .when('chron-off', {allow: ['start-isochronal', 'log-data']})
        .when('chron-on', {allow: ['stop-isochronal', 'log-data']})
        .stream('temperatureStream', this.streamTemperature)
        .stream('humidityStream', this.streamHumidity)
        .monitor('temperature')
        .monitor('humidity')
        .map('stop-isochronal', this.stopIsochronal)
        .map('start-isochronal', this.startIsochronal)
        .map('log-data', this.logData)
        .name(this.htu21d_sensor.deviceName())
        .remoteFetch(function() {
            return {
                temperature: this.temperature,
                humidity: this.humidity
            };
        });

};

htu21d.prototype.startIsochronal = function(callback) {
    this.state = 'chron-on';

    // load values right away before the timer starts
    this.temperature = this.readTemperature();
    this.humidity = this.readHumidity();
    
    var self = this;
    
    this._chron = setInterval(function() {
        self.temperature = self.readTemperature();
        self.humidity = self.readHumidity();
    }, this.chronPeriod);

    callback();
}

htu21d.prototype.stopIsochronal = function(callback) {
    this.state = 'chron-off';
    clearTimeout(this._chron);
    callback();
};

htu21d.prototype.streamTemperature = function(stream) {
    var self = this;
    this._streamTemp = setInterval(function() {
        stream.write(self.readTemperature());
    }, this.streamPeriod);
};

htu21d.prototype.streamHumidity = function(stream) {
    var self = this;
    this._streamHum = setInterval(function() {
        stream.write(self.readHumidity());
    }, this.streamPeriod);
};

htu21d.prototype.logData = function() {
    this.log("Humidity : " + this.readHumidity() + ", Temperature : " + this.readTemperature());
}

htu21d.prototype.readTemperature = function() {
    if (this.htu21d_sensor.deviceActive()) {
        return this.htu21d_sensor.valueAtIndexSync(1);
    }
    // else ?
};

htu21d.prototype.readHumidity = function() {
    if (this.htu21d_sensor.deviceActive()) {
        return this.htu21d_sensor.valueAtIndexSync(0);
    }
    // else ?
};


