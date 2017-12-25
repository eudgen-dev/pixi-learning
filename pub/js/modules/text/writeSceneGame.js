'use strict';

const P = require('pixi.js');
const TS = require('./styles');

function setupSceneLabels(conteiners, settings, texts) {
    texts.lables.square = new P.Text('Square: 0', TS.labels);
    texts.lables.square.position.x = settings.u * 0.5;
    texts.lables.square.position.y = settings.u;
    texts.lables.square.anchor = new P.Point(0, 0.5);
    conteiners.lables.addChild(texts.lables.square);

    texts.lables.shapes = new P.Text('Shapes: 0', TS.labels);
    texts.lables.shapes.position.x = settings.main.x - settings.u * 0.5;
    texts.lables.shapes.position.y = settings.u;
    texts.lables.shapes.anchor = new P.Point(1, 0.5);
    conteiners.lables.addChild(texts.lables.shapes);
}

module.exports = setupSceneLabels;

