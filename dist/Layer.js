"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
const Neuron_1 = require("./Neuron");
class Layer {
    constructor(neuronCount, inputCount) {
        this.neurons = [];
        this.neurons = new Array(neuronCount).fill(null).map(() => new Neuron_1.Neuron(inputCount));
    }
    layersForward(inputs) {
        return this.neurons.map(neuron => neuron.neuronForward(inputs));
    }
}
exports.Layer = Layer;
