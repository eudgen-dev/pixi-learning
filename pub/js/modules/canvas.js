'use strict'

const P = require('pixi.js');
const Elements = require('./interface/Elements');

var Canvas = {
    app: null,
    
    width: window.innerWidth,
    height: window.innerHeight,
    
    createCanvas: function () {
        this.app = new P.Application(this.width, this.height); 
        document.body.appendChild(this.app.view);
        this.createControls();
        this.showCanvas();
    },
    
    createControls: function() {
        let buttons = {};
        let menu = new P.Container();
        
        menu.visible = true;
        this.app.stage.addChild(menu);
        
        buttons.newGame = new Elements.Button('New Game', {x: (this.width - 100), y: (this.height - 100)})
        menu.addChild(buttons.newGame);
    }, 
    
    showCanvas: function () {
        document.getElementById('loading').style.display = 'none';
        document.getElementsByTagName('canvas')[0].style.display = 'block'
    },
    
    getCanvas: function() {
        return this.app;
    }
}

module.exports = Canvas;
