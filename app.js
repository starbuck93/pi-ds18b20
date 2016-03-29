//Include necessary node packages
/*

    curl -sLS https://apt.adafruit.com/add | sudo bash
    sudo apt-get install node

$ cd /var/www
$ npm install -g ds18b20 socket.io socket.io-client
*/


var io = require('/usr/local/lib/node_modules/socket.io').listen(3000),
    ds18b20 = require('/usr/local/lib/node_modules/ds18b20');
 
var interval = 3000; //enter the time between sensor queries here (in milliseconds)
 
//when a client connects
io.sockets.on('connection', function (socket) {
 
    var sensorId = [];
    //fetch array containing each ds18b20 sensor's ID
    ds18b20.sensors(function (err, id) { 
        console.log(id);
        console.log(err);
        sensorId.push(id);
        socket.emit('sensors', id); //send sensor ID's to clients
    });
 
    //initiate interval timer
    setInterval(function () {
        //loop through each sensor id
        sensorId.forEach(function (id) {
 
            ds18b20.temperature(id, function (err, value) {
                
                //send temperature reading out to connected clients T(°F) = T(°C) × 9/5 + 32
                var F = value * 1.8 + 32;
                var sendMe = F + " F"
                socket.emit('temps', {'id': id, 'value': sendMe});
                console.log("Sent " + sendMe);
            });
        });
 
    }, interval);
});

 