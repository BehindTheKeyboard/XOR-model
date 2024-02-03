"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralNetwork = void 0;
const Layer_1 = require("./Layer");
class NeuralNetwork {
    constructor() {
        this.layers = [];
        this.layers = [
            new Layer_1.Layer(2, 2),
            new Layer_1.Layer(1, 2),
        ];
    }
    forward(input) {
        let currentOutput = input;
        for (const layer of this.layers) {
            currentOutput = layer.layersForward(currentOutput);
        }
        return currentOutput;
    }
}
exports.NeuralNetwork = NeuralNetwork;
