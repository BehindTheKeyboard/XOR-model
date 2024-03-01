"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neuron = void 0;
class Neuron {
    constructor(inputCount) {
        this.bias = Math.random();
        this.weights = Array(inputCount).fill(0).map(() => Math.random() * Math.sqrt(2 / (inputCount + inputCount)) - 0.5);
        // console.log("INITIAL WEIGTHS: ", this.weights);
    }
    //Activation function.
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    neuronForward(inputs) {
        const sum = inputs.reduce((acc, input, idx) => acc + input * this.weights[idx], this.bias);
        console.log("SIGMOID ", this.sigmoid(sum));
        return this.sigmoid(sum);
    }
    // New method to update weights and bias
    updateWeights(inputs, learningRate, delta) {
        // Log before update
        console.log(`Before Update - Weights: ${this.weights}, Bias: ${this.bias}, Delta: ${delta}`);
        // Update each weight
        this.weights = this.weights.map((weight, index) => {
            const updatedWeight = weight - learningRate * delta * inputs[index];
            return updatedWeight;
        });
        // Update bias
        this.bias -= learningRate * delta;
        // Log after update
        console.log(`After Update - Weights: ${this.weights}, Bias: ${this.bias}`);
    }
}
exports.Neuron = Neuron;
