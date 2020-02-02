//jhonny five
var five = require("johnny-five");
var Firmata = require("firmata").Board;
var EtherPortClient = require("etherport-client").EtherPortClient;
var sp = new EtherPortClient({
  host: "192.168.1.50",
  //host: "192.168.4.1",
  port: 3030
});
var io = new Firmata(sp);
io.once("ready", function() {
  io.isReady = true;
  console.log(
    io.firmware.name +
      "-" +
      io.firmware.version.major +
      "." +
      io.firmware.version.minor
  );
  var board = new five.Board({ io: io, repl: true });
  board.on("ready", function() {
    var led = new five.Led(14);
    board.isReady = true;
    var lastVal = 0;
    //firebase
    const dotenv = require("dotenv");
    const firebase = require("firebase");
    //ENV
    dotenv.load();
    console.log(process.env.FIREBASE_DATABASE_URL);
    // configure firebase
    firebase.initializeApp({
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    const database = firebase.database();
    //call acction
    const contactsRef = database.ref("/iot/led");
    //declarar relay
    var relay = new five.Relay(1);
    relay.off();
    this.repl.inject({
      relay: relay
    });
    //update
    contactsRef.on("child_added", addOrUpdateIndexRecord);
    contactsRef.on("child_changed", addOrUpdateIndexRecord);
    contactsRef.on("child_removed", deleteIndexRecord);
    function addOrUpdateIndexRecord(contact) {
      console.log(contact.val());
      if (contact.val() == true) {
        relay.on();
        console.log("apagado");
      }
      if (contact.val() == false) {
        relay.off();
        console.log("encendido");
      }
    }
    function deleteIndexRecord(contact) {
      //console.log(contact.key);
    }
    ///////////
    const express = require("express");
    const bodyParser = require("body-parser");
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post("/send", (req, res) => {
      if (req.body.val == true) {
        led.on();
      }
      if (req.body.val == "blink") {
        led.blink(1000);
      }
      console.log(req.body);
    });
    const server = app.listen(3000, function() {
      console.log("Port 3000!");
    });
  });
});
