input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    addAndShowPoints(0)
})
function addAndShowPoints (points: number) {
    if (points > 0) {
        punkte += points
    } else {
        punkte = 0
    }
    _4digit.show(punkte)
    if (punkte == 0) {
        basic.showIcon(IconNames.Sad)
    }
    if (punkte > 50 && punkte < 100) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            . . . . .
            `)
    }
    if (punkte > 100 && punkte < 200) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # # # # #
            . . . . .
            `)
    }
    if (punkte > 200) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    }
}
let punkte = 0
let _4digit: grove.TM1637 = null
DFPlayerPro.MP3_setSerial(SerialPin.P8, SerialPin.P13)
DFPlayerPro.MP3_setVol(15)
DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.playOneSongAndPause)
DFPlayerPro.MP3_ledMode(DFPlayerPro.ledType.ledOn)
DFPlayerPro.MP3_promtMode(DFPlayerPro.PromtType.promtOff)
let strip = neopixel.create(DigitalPin.P14, 30, NeoPixelMode.RGB)
_4digit = grove.createDisplay(DigitalPin.P2, DigitalPin.P16)
_4digit.set(7)
addAndShowPoints(0)
music.setVolume(255)
basic.showLeds(`
    . . # . .
    . # # # .
    # . # . #
    . . # . .
    . . # . .
    `)
basic.forever(function () {
    if (grove.measureInCentimetersV2(DigitalPin.P1) < 10) {
        addAndShowPoints(10)
        DFPlayerPro.MP3_playFileNum(4)
        basic.pause(50)
    }
})
basic.forever(function () {
    if (grove.measureInCentimetersV2(DigitalPin.P15) < 10) {
        addAndShowPoints(20)
        DFPlayerPro.MP3_playFileNum(3)
        basic.pause(50)
    }
})
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P0) > 10) {
        DFPlayerPro.MP3_playFileNum(5)
        addAndShowPoints(50)
        for (let index = 0; index < 20; index++) {
            strip.showBarGraph(pins.analogReadPin(AnalogPin.P0), 150)
            basic.pause(100)
        }
        DFPlayerPro.MP3_control(DFPlayerPro.ControlType.playPause)
        strip.clear()
    }
})
