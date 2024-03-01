"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralNetwork = void 0;
const Layer_1 = require("./Layer");
class NeuralNetwork {
    constructor() {
        this.layers = [];
        this.layers = [
            new Layer_1.Layer(2, 2),
            new Layer_1.Layer(1, 2)
        ];
    }
    forward(input) {
        let currentOutput = input;
        for (const layer of this.layers) {
            currentOutput = layer.layersForward(currentOutput);
        }
        return currentOutput;
    }
    train(input, expected, learningRate) {
        const outputs = [];
        let currentInput = input;
        console.log(`Starting training with input: ${input} and expected output: ${expected}`);
        // Forward pass: Collect outputs for each layer
        for (const layer of this.layers) {
            currentInput = layer.layersForward(currentInput);
            outputs.push(currentInput); // Store output for each layer
            console.log(`Output after layer ${this.layers.indexOf(layer) + 1}: ${currentInput}`);
        }
        // Start of backpropagation
        let delta;
        for (let i = this.layers.length - 1; i >= 0; i--) {
            const layer = this.layers[i];
            const output = outputs[i]; // Output of the current layer
            const prevOutput = i === 0 ? input : outputs[i - 1]; // Output of the previous layer (input for the current layer)
            if (i === this.layers.length - 1) {
                // For the last layer, calculate delta based on the error
                delta = output.map((o, i) => {
                    const error = o - expected[i];
                    const gradient = error * o * (1 - o); // This is the gradient due to the derivative of the sigmoid
                    console.log(`Gradient for output layer neuron ${i}: ${gradient}`);
                    return gradient; // Adjust delta to include derivative of sigmoid
                });
                console.log(`Delta for last layer: ${delta}`);
            }
            else {
                // For hidden layers, propagate the error backwards
                let nextLayer = this.layers[i + 1];
                delta = nextLayer.neurons.map((neuron, index) => neuron.weights.reduce((acc, weight, weightIndex) => acc + delta[weightIndex] * weight, 0)).map((val, index) => {
                    const outputVal = output[index];
                    const gradient = val * outputVal * (1 - outputVal); // This is the gradient due to the derivative of the sigmoid
                    console.log(`Gradient for hidden layer neuron ${index}: ${gradient}`);
                    return gradient; // Adjust for sigmoid derivative
                });
                console.log(`Delta for layer ${i + 1}: ${delta}`);
            }
            // Before weight and bias update
            console.log(`Layer ${i + 1} - Before update: Weights and biases of neurons`);
            // Update weights and biases for the current layer
            layer.neurons.forEach((neuron, neuronIndex) => {
                // You might want to log inside the updateWeights method for each neuron to see before/after values
                neuron.updateWeights(prevOutput, learningRate, delta[neuronIndex]);
            });
            // After weight and bias update
            // This log might need to be inside updateWeights to capture actual after-update values
            console.log(`Layer ${i + 1} - After update: Weights and biases of neurons`);
        }
    }
}
exports.NeuralNetwork = NeuralNetwork;
