'use strict'

/*============================================================================*/
// Modules

/*============================================================================*/

const P = require('pixi.js');
const writeSceneGame = require('./modules/text/writeSceneGame');
const settingsSetup = require('./modules/shapesSettings');
const shape = require('./modules/shape');
const Elements = require('./modules/interface/Elements')

let Shapes = {
    id: document.getElementById('shapesCanvas')
}

let Settings = {};
let Containers = {
    lables: {},
    game: {},
    buttons: {}
};

let Texts = {
    lables: {}
};

let Buttons = {
    speedup: {},
    speeddown: {},
}

let figures = {
    count: -1,
    data: []
};

let App = {

    gravity: 0,
    
    interval: null,
    
    intervalPeriod: 0,
    
    bgColor: null,
    
    setupLabels() {
        Containers.lables = new P.Container();
        Shapes.main.stage.addChild(Containers.lables);
        writeSceneGame(Containers, Settings, Texts);
    },
    
    setupButtons() {        
        Containers.buttonsspeed = new P.Container();
        Containers.buttonsspeed.position = new P.Point(Settings.u*15, Settings.u*26)                  
        Shapes.main.stage.addChild(Containers.buttonsspeed);    
        
        Buttons.speedup = new Elements.Button('Speed+', {x: Settings.u*10, y: Settings.u*4, width: Settings.u*4, height: Settings.u*4});
        Buttons.speedup.type = 'speedup';
        Containers.buttonsspeed.addChild(Buttons.speedup);
        
        Buttons.speeddown = new Elements.Button('Speed-', {x: Settings.u*6, y: Settings.u*4, width: Settings.u*4, height: Settings.u*4});
        Buttons.speeddown.type = 'speeddown'; 
        Containers.buttonsspeed.addChild(Buttons.speeddown);

        Containers.buttonsrequency = new P.Container();
        Containers.buttonsrequency.position = new P.Point(0, Settings.u*26)                  
        Shapes.main.stage.addChild(Containers.buttonsrequency);    
        
        Buttons.frequencyup = new Elements.Button('Frequency+', {x: Settings.u*10, y: Settings.u*4, width: Settings.u*4, height: Settings.u*4});
        Buttons.frequencyup.type = 'frequencyup';
        Containers.buttonsrequency.addChild(Buttons.frequencyup);
        
        Buttons.frequencydown = new Elements.Button('Frequency-', {x: Settings.u*6, y: Settings.u*4, width: Settings.u*4, height: Settings.u*4});
        Buttons.frequencydown.type = 'frequencydown'; 
        Containers.buttonsrequency.addChild(Buttons.frequencydown);

        this.bindButton();
    },

    bindButton() {
        for (let buttonType in Buttons) {
            Buttons[buttonType].mousedown = Buttons[buttonType].touchstart = function() {
                let gravityKoef = Settings.intervalPeriod/Settings.gravity;
                if(Buttons[buttonType].type === 'speedup') {
                    App.gravity++;
                    App.intervalPeriod = Settings.intervalPeriod - ((App.gravity - Settings.gravity) * gravityKoef);
                } else if(Buttons[buttonType].type === 'speeddown') {
                    App.gravity--;
                    App.intervalPeriod = Settings.intervalPeriod + ((App.gravity - Settings.gravity) * gravityKoef);
                } else if(Buttons[buttonType].type === 'frequencyup') {
                    App.intervalPeriod = App.intervalPeriod - 100;             
                } else if(Buttons[buttonType].type === 'frequencydown') {
                    App.intervalPeriod = App.intervalPeriod + 100;
                }
                
                if(     Buttons[buttonType].type === 'speedup' || 
                        Buttons[buttonType].type === 'speeddown' || 
                        Buttons[buttonType].type === 'frequencyup' || 
                        Buttons[buttonType].type === 'frequencydown'
                    ) {
                    if(App.gravity <= 0) {
                        App.gravity = 0;
                    }

                    if(App.intervalPeriod < 100) {
                        App.intervalPeriod = 100;
                    }
                    
                    clearInterval(App.interval);
                    if(App.gravity && App.intervalPeriod) {
                        App.setupInterval();
                    }
                }
            }
        }
    },

    setupGame() {
        Containers.game = new P.Container();
        Shapes.main.stage.addChild(Containers.game);
        this.launchShapes();
    },
        
    launchShapes() {
        this.setupInterval();
        Shapes.main.ticker.add(function () {
            let square = 0;
            for (let i = 0; i <= figures.count; i++) {
                if(typeof(figures.data[i]) !== 'undefined') {
                    figures.data[i].position.y += this.gravity;
                    if ((figures.data[i].position.y - figures.data[i].height) > Settings.main.y) {
                        figures.data[i].live = false;
                        figures.data.splice(i, 1);
                    } else {
                        square = square + figures.data[i].square;
                    }
                }
            }
            
            let shapesCount = figures.data.length;
            this.updateLabelText(square, shapesCount);
            
        }.bind(this));
    },
    
    updateLabelText(square, shapesCount) {
        Texts.lables.square.text = `Square: ${square}`;
        Texts.lables.shapes.text = `Shapes: ${shapesCount}`;
    },
    
    setupInterval() {
        this.interval = setInterval(function () {
            this.createShape();
        }.bind(this), this.intervalPeriod);
    },
    
    createShape: function (startx, starty) {
        figures.count++;
        let shapeObj = new shape();
        let _params = {num: figures.count, startx: startx, starty: starty};
        let instanse = shapeObj.instance(Settings, _params);
        figures.data.push(instanse);
        Containers.game.addChild(instanse);
        instanse.on('pointerdown', this.clearFigure);
    },

    setupMainBg() {
        Containers.bg = new P.Container();
        Shapes.main.stage.addChild(Containers.bg);
        
        let bg = new P.Graphics();
        bg.lineStyle(0);
        bg.interactive = true;
        bg.buttonMode = true;
        bg.beginFill(this.bgColor, 1);
        bg.drawRect(0, 0, Settings.main.x, Settings.main.y);
        bg.endFill();
        
        bg.on('pointerdown', function(e) {
            App.createShape(e.data.global.x, e.data.global.y)
        });
        
        Containers.bg.addChild(bg);
    },

    setupMainScene() {
        this.setupLabels();
        this.setupButtons();
        this.setupGame();
    },
    
    clearFigure: function () {
        this.clear();
    },

    setupStage() {
        Shapes.main = new P.Application(Settings.main.x, Settings.main.y, {backgroundColor: this.bgColor, view: Shapes.id});
        Shapes.main.interactive = true;
        
        this.setupMainBg();
        this.setupMainScene();
    },

    setupCanvas() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('shapesCanvas').style.display = 'block';
    },

    setupSettings() {
        Settings = settingsSetup();
        this.gravity = Settings.gravity;
        this.intervalPeriod = Settings.intervalPeriod;
        this.bgColor = Settings.bgColor;
    },
    
    setupAll() {
        this.setupSettings();
        this.setupCanvas();
        this.setupStage();
    }
}

App.setupAll();
