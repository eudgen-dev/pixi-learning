'use strict'

var P = require('pixi.js')
var T = require('../textures')
var TS = require('../text/styles')

function Button(text, btnOptions, textOptions) {
    var btn, btnText;

    //------------------------------------------------------------
    // SETUP SPRITE

    // set btn options if they don't exist
    if (typeof btnOptions === 'undefined') {
        btnOptions = {};
    }

    switch (btnOptions.textures) {
        case 'sq':
            btnOptions.textures = {
                normal: T.button.sq.normal,
                hover: T.button.sq.hover
            }
            break;
        default:
            btnOptions.textures = {
                normal: T.button.sq.normal,
                hover: T.button.sq.hover
            }
            break;
    }

    btnOptions.x = typeof btnOptions.x !== 'undefined' ? btnOptions.x : 0;
    btnOptions.y = typeof btnOptions.y !== 'undefined' ? btnOptions.y : 0;

    // setup button
    btn = new P.Sprite(btnOptions.textures.normal)
    btn.position.x = btnOptions.x;
    btn.position.y = btnOptions.y;

    if (typeof btnOptions.width !== 'undefined') {
        btn.width = btnOptions.width;
    }
    if (typeof btnOptions.height !== 'undefined') {
        btn.height = btnOptions.height;
    }

    // make it interactive
    btn.interactive = true;
    btn.buttonMode = true;

    // swap textures
    btn.mouseover = function () {
        btn.texture = btnOptions.textures.hover;
    }
    btn.mouseout = function () {
        btn.texture = btnOptions.textures.normal;
    }

    //------------------------------------------------------------
    // SETUP TEXT

    // set text options if they don't exist
    if (typeof textOptions === 'undefined') {
        textOptions = {};
    }
    if (typeof textOptions.style === 'undefined') {
        textOptions.style = TS.btnText;
    }

    btnText = new P.Text(text, textOptions.style);

    btn.anchor = new P.Point(0.5, 0.5);
    btnText.anchor = new P.Point(0.5, 0.5);

    btn.addChild(btnText);

    return btn;
}

module.exports = Button;
