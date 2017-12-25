'use strict'

function shapesSettings() {
    let ratio = window.devicePixelRatio;
    let settings = {
        u: 30 * ratio,
        r: ratio,
        gravity: 4,
        intervalPeriod: 500,
        bgColor: 0x1099bb,
        main: {
            x: 1920 / 2 * ratio,
            y: 1920 / 2 * ratio
        }
    }

    return settings;
}

module.exports = shapesSettings;


