var five = require("johnny-five");
var Firmata = require("firmata").Board;
var EtherPortClient = require("etherport-client").EtherPortClient;
var sp = new EtherPortClient({
  host: "192.168.1.43",
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
    console.log("five ready");
    var imu = new five.IMU({
      controller: "MPU6050"
    });

    imu.on("change", function() {
      console.log("Thermometer");
      console.log("  celsius      : ", this.thermometer.celsius);
      console.log("  fahrenheit   : ", this.thermometer.fahrenheit);
      console.log("  kelvin       : ", this.thermometer.kelvin);
      console.log("--------------------------------------");

      console.log("Accelerometer");
      console.log("  x            : ", this.accelerometer.x);
      console.log("  y            : ", this.accelerometer.y);
      console.log("  z            : ", this.accelerometer.z);
      console.log("  pitch        : ", this.accelerometer.pitch);
      console.log("  roll         : ", this.accelerometer.roll);
      console.log("  acceleration : ", this.accelerometer.acceleration);
      console.log("  inclination  : ", this.accelerometer.inclination);
      console.log("  orientation  : ", this.accelerometer.orientation);
      console.log("--------------------------------------");

      console.log("Gyroscope");
      console.log("  x            : ", this.gyro.x);
      console.log("  y            : ", this.gyro.y);
      console.log("  z            : ", this.gyro.z);
      console.log("  pitch        : ", this.gyro.pitch);
      console.log("  roll         : ", this.gyro.roll);
      console.log("  yaw          : ", this.gyro.yaw);
      console.log("  rate         : ", this.gyro.rate);
      console.log("  isCalibrated : ", this.gyro.isCalibrated);
      console.log("--------------------------------------");
    });
  });
});
console.log("cargando");
