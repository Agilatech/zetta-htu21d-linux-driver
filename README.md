##Zetta htu21d driver for Linux

#####This driver should work on any Linux platform, but has so far only been tested on BeagleBone Black

###Install

```
$> git clone https://github.com/zettajs/zetta-htu21d-linux-driver zetta-htu21d-linux-driver
```

###Usage

```
var zetta = require('zetta');
var htu21d = require('zetta-htu21d-linux-driver');
```
```
zetta()
  .use(htu21d, [options])  // where options define operational paramters -- omit to accept defaults
  .listen(1337)
```

**OPTIONS**

    "bus":"<i2c bus device>"
      /dev/i2c-0, /dev/i2c-1, /dev/i2c-2, etc...

    "chronPeriod":<period>
      period in milliseconds for monitored isochronal data

    "streamPeriod":<period>
      period in milliseconds for streaming data

####Example 
````
zetta().use(htu21d, {"bus":"/dev/i2c-1", "chronPeriod":60000, "streamPeriod":1000})
````

initializes the htu21d driver on i2c bus /dev/i2c-1 with a data monitoring period of 60 seconds and streaming data every second

### Hardware

* Beaglebone Black
* Beaglebone Green
* Should also work on Raspberry Pi as well as other Linux SBC

###Transitions

#####start-isochronal

Begins the periodic collection of temperature and humidity data. Values are monitored as
temperature and humidity, and the period is set by the 'chronPeriod' option (defaults to 60 sec).

#####stop-isochronal

Stops data collection for the monitored values.

###Design

This device driver is designed for both streaming and discreet data collection from the HTU21D sensor.