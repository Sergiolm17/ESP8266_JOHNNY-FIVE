var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");
var sp = new VirtualSerialPort({
    //host: "192.168.1.103", con el wifi unido
    host: "192.168.4.1",
    port: 3030
});
var io = new firmata.Board(sp);
io.on('ready', function(){
    console.log('IO Ready');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    board.on('ready', function(){
        console.log('five ready');
        var led = new five.Led(13);
        led.blink();
    });
});
console.log("\nEsperando a que inicialice el dispositivo esp8266...");
