'use strict'

const P = require('pixi.js');

var Shape = function () {

    this.width = 50;
   
    this.instance = function(settings, params) {
        this.color = this.randomColor();
        
        let shape = new P.Graphics(); 
        let inAreaX = settings.main.x - (this.width * 2);
        let coordY, coordX;
        if(params.startx && params.starty) {
            coordY = params.starty;
            coordX = params.startx;
        } else {
            coordY = -1 * this.width;
            coordX = Math.floor(Math.random() * inAreaX);
        }        

        shape.lineStyle(0);
        shape.interactive = true;
        shape.buttonMode = true;
        shape.live = true;
        shape.num = params.num;
        
        shape.beginFill(this.randomColor(), 1);
        
        let type = this.randomType();
        let square = 0;
        switch(type) {
            case 'circle':
                square = 3.14*this.width*this.width;
                shape.drawCircle(coordX, coordY, this.width);
                break;
            case 'rect':
                square = this.width*this.width;
                shape.drawRect(coordX, coordY, this.width, this.width);
                break;
            case 'ellipse':
                square = 3.14*this.width*(this.width * 1.5);
                shape.drawEllipse(coordX, coordY, this.width * 1.5, this.width);
                break;    
            default:
                square = 3.14*this.width*this.width;
                shape.drawCircle(coordX, coordY, this.width);
        }
        
        shape.square = square;
        
        return shape;
    };
    
    
    this.randomColor = function() {
        let colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba];
        return colors[Math.floor(Math.random() * colors.length)];
    };
      
    
    this.randomType = function() {
        let types = ['circle', 'rect', 'ellipse'];
        return types[Math.floor(Math.random() * types.length)];
    };
    
}

module.exports = Shape
