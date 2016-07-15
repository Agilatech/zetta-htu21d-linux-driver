module.exports = function testApp(server) {
  
  var htu21dDeviceQuery = server.where({type:'HTU21D_Sensor'});
  
  server.observe([htu21dDeviceQuery], function(htu21dDevice) {
    setInterval(function(){
      htu21dDevice.call('log-data');
    }, 10000);
  });
  
}