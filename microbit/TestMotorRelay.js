input.onButtonPressed(Button.A, function () {
    Motor += 1
    if (Motor > 10) {
        Motor = 1
    }
    if (Motor < 10) {
        basic.showString("" + Motor)
    } else {
        basic.showString("A")
    }
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, Motor * 10)
})
input.onButtonPressed(Button.B, function () {
    Motor = 0
    Kitronik_Robotics_Board.allOff()
})
let Motor = 0
Kitronik_Robotics_Board.allOff()
Motor = 0

