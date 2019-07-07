// Check the charing mechanism for a charge event
function readCharger () {
    // Counter for the readings to validate a charging
    // rotation
    isChargingCount = 0
    for (let i = 0; i < countCharger; i++) {
        analogIn = pins.analogReadPin(AnalogPin.P0)
        // Check if the analog input is valid
        if (analogIn > 90) {
            // Increment the readings counter
            isChargingCount += 1
        }
        basic.pause(10)
    }
    // Check if all the readings were accepted to validate
    // the counter
    if (isChargingCount == countCharger) {
        // Increment the charging levels
        chargeLevel += 1
    }
}
// Control che charge level and the player status
input.onButtonPressed(Button.A, function () {
    if (isPlaying == true) {
        // Current position in DEG of the servo controller
        // arrow.
        chargeLevel = chargeLevel - 1
        // Current position in DEG of the servo controller
        // arrow.
        arrowPosition = stepDeg * chargeLevel
        updateCharger()
    }
})
// Update the arrow servo status accoringly with the
// charge level
function updateControls () {
    // Current position in DEG of the servo controller
    // arrow.
    arrowPosition = stepDeg * chargeLevel
    Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, arrowPosition)
    // If the light is on, power on the realay, else power
    // if off
    if (lightStatus == true) {
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, 100)
        // As the carillon is full charged, set the playing
        // flag
        isPlaying = true
        // Set the Arduino player control pin to (off)
        pins.digitalWritePin(DigitalPin.P11, 0)
    } else {
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, 0)
        // As the carillon is full charged, set the playing
        // flag
        isPlaying = false
        // Set the Arduino player control pin to (off)
        pins.digitalWritePin(DigitalPin.P11, 1)
    }
}
// Send signal to the Ardino player for the next song.
// The song list is circular
function playNewSong () {
    // Set the Arduino player control pin to (off)
    pins.digitalWritePin(DigitalPin.P11, 1)
    basic.pause(500)
    // Set the Arduino player control pin to (off)
    pins.digitalWritePin(DigitalPin.P11, 0)
}
// Update the arrow servo status accoringly with the
// charge level and eventually disable the music
// playing if the charge level is 0
function updateCharger () {
    basic.showString("" + chargeLevel)
    Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, arrowPosition)
    // If the light is on, power on the realay, else power
    // if off
    if (chargeLevel == 0) {
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, 0)
        // As the carillon is full charged, set the playing
        // flag
        isPlaying = false
        // Set the Arduino player control pin to (off)
        pins.digitalWritePin(DigitalPin.P11, 1)
    } else {
        playNewSong()
    }
}
let analogIn = 0
let isChargingCount = 0
let isPlaying = false
let lightStatus = false
let stepDeg = 0
let chargeLevel = 0
let countCharger = 0
let arrowPosition = 0
// Disable all the output of the Kitronik Robotic
// Board
Kitronik_Robotics_Board.allOff()
Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, 0)
// Initialze the motor 1 (light relay control) as off
Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, 0)
// Arduino Player control pin off status
let playerOff = 1
// Arduino Player control pin on status
let playerOn = 0
// Current position in DEG of the servo controller
// arrow.
arrowPosition = 0
// Number of charger reads to have a valid charging
// count
countCharger = 5
// Current level of charge. Start from zero up to
// maxChargeLevel
chargeLevel = 0
// Max number of charge level. Every level of charge
// plays a song
let maxChargeLevel = 6
// The servo rotation steps in DEG every charge
// setting
stepDeg = 15
// The light status controlled by the relais on motor1
// powered when the music is playing
lightStatus = false
isPlaying = false
basic.forever(function () {
    // Only if it is not playing the chager can be used
    if (isPlaying == false) {
        readCharger()
        basic.showString("" + chargeLevel)
        // Check if the carillon is full charged and start
        // playing
        if (chargeLevel == maxChargeLevel) {
            // Change the lilght status controlled by the
            // background process
            lightStatus = true
        } else {
            // Change the lilght status controlled by the
            // background process
            lightStatus = false
        }
        updateControls()
    }
})

