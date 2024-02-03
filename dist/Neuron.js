"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neuron = void 0;
class Neuron {
    constructor(inputCount) {
        this.bias = Math.random();
        this.weights = Array(inputCount).fill(0).map(() => Math.random() - 0.5);
    }
    // Sigmoid is an activation function
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    // Forward pass through this neuron
    neuronForward(inputs) {
        const sum = inputs.reduce((acc, input, idx) => acc + input * this.weights[idx], this.bias);
        return this.sigmoid(sum);
    }
}
exports.Neuron = Neuron;
