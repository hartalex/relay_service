const wpi = require('wiringpi-node')

var pins = [0, 2]
var currentPin = 0
var mode = process.argv[2]

wpi.wiringPiSetupGpio()
for (var setupPin in pins) {
  wpi.pinMode(setupPin, wpi.OUTPUT)
  var pinval = wpi.digitalRead(setupPin)
  if (pinval === 0) {
    currentPin = setupPin
    console.log('Pin ' + currentPin + 'is on')
  }
}
if (mode === 'on' && currentPin === 0 || mode === 'off' && currentPin === 2) {
  // nothing to do
  console.log('Already set')
} else {
  // turn off currentPin and turn on the other pin
  console.log('switching')
  for (var pin in pins) {
    if (pin === currentPin) {
      wpi.digitalWrite(pin, 1)
    } else {
      wpi.digitalWrite(pin, 0)
    }
  }
}
