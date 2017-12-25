'use strict';

var P = require('pixi.js');

var textures = {
    button: {
        sq: {
            normal: new P.Texture.fromImage('../img/textures/Sq_Normal.png'),
            hover: new P.Texture.fromImage('../img/textures/Sq_Hover.png')
        }
    }
}

module.exports = textures;