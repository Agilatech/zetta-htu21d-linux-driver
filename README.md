##Zetta htu21d humidity and temperature sensor driver for Linux

This driver should work on any Linux platform, but has so far only been tested on BeagleBone Black

###Install
```
$> npm install @agilatech/zetta-htu21d-linux-driver
```
OR
```
$> git clone https://github.com/Agilatech/zetta-htu21d-linux-driver zetta-htu21d-linux-driver
```
###Usage

```
var zetta = require('zetta');
var htu21d = require('@agilatech/zetta-htu21d-linux-driver');

zetta()
.use(htu21d, [options])  // where [options] define operational paramters -- omit to accept defaults
.listen(<port number>)   // where <port number> is the port on which the zetta server should listen
```

####OPTIONS
These options are defined in a file named 'options.json' which may be overridden by program definitions
```
"bus":"<i2c bus device>"
/dev/i2c-0, /dev/i2c-1, /dev/i2c-2, etc...  Defaults to /dev/i2c-1

"chronPeriod":<period>
period in milliseconds for monitored isochronal data

"streamPeriod":<period>
period in milliseconds for streaming data
```


###Example
Using directly in the zetta server:
```
const zetta = require('zetta');
const htu_sensor = require('@agilatech/zetta-htu21d-linux-driver');
zetta().use(htu_sensor).listen(1337);
```
Initializes the htu21d driver on i2c bus /dev/i2c-1 with a data monitoring period of 60 seconds and streaming data every second

To override the options defined in the options.json file, supply them in an object in the use statement like this:
```
zetta().use(htu_sensor, { "bus":"/dev/i2c-1", "chronPeriod":30000, "streamPeriod":15000 });
```
Overrides the defaults to initialize the bus on **/dev/i2c-1** with a data monitoring period of **30 seconds** and streaming data every **1.5 seconds**
### Hardware

* Beaglebone Black
* Beaglebone Green
* Should also work on Raspberry Pi as well as other Linux SBC

###Transitions
```
start-isochronal
```
Begins the periodic collection of humidity and temperature data. Values monitored as humidity %, and temperature ℃, 
with the period set by the 'chronPeriod' option (defaults to 60 sec).
```
stop-isochronal
```
Stops data collection for the monitored values.

###Design

This device driver is designed for both streaming and discreet data collection from the HTU21D sensor.

###Copyright
Copyright © 2016 Agilatech. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.