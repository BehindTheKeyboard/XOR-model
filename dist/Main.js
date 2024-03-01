"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NeuralNetwork_1 = require("./NeuralNetwork");
const Dataset_1 = require("./Dataset");
const Logger_1 = require("./Logger");
const fs = require("fs");
const path = require("path");
const network = new NeuralNetwork_1.NeuralNetwork(); // update NueralNetwork constructor if you want to manually set layers
function train(network, dataset, epochs, learningRate) {
    for (let epoch = 0; epoch < epochs; epoch++) {
        let totalError = 0; // Keep track of total error for logging
        dataset.forEach(dataPoint => {
            // Perform a forward pass to get the current predictions
            const predictions = network.forward(dataPoint.inputs);
            // Log training details including the actual prediction
            (0, Logger_1.logToFile)(`Epoch ${epoch + 1}, Training with input: ${dataPoint.inputs}, Expected output: ${dataPoint.output}, Actual output: ${predictions.map(o => o.toFixed(2))}`);
            // Proceed with the training (backpropagation)
            network.train(dataPoint.inputs, [dataPoint.output], learningRate);
            // Optionally, calculate and log error here if desired
            const error = dataPoint.output[0] - predictions[0]; // Simplified error calculation for demonstration
            totalError += error ** 2;
        });
        // Log total error at the end of each epoch
        (0, Logger_1.logToFile)(`End of Epoch ${epoch + 1}, Total Error: ${totalError.toFixed(2)}`);
    }
}
function testXOR(network) {
    console.log("\nTesting XOR");
    (0, Logger_1.logToFile)("\nTesting XOR");
    (0, Logger_1.logToFile)("*************************************\n");
    const testCases = [
        { input: [0, 0], expected: 0 },
        { input: [0, 1], expected: 1 },
        { input: [1, 0], expected: 1 },
        { input: [1, 1], expected: 0 }
    ];
    testCases.forEach(testCase => {
        const output = network.forward(testCase.input);
        // Assuming your network outputs a value between 0 and 1, you might want to round the output
        const predicted = output.map(o => Math.round(o));
        console.log(`Input: [${testCase.input}], Expected: ${testCase.expected}, Predicted: ${predicted}`);
        (0, Logger_1.logToFile)(`Input: [${testCase.input}], Expected: ${testCase.expected}, Predicted: ${predicted}`);
    });
}
function saveModel(model, fileName) {
    console.log("SAVING MODEL");
    (0, Logger_1.logToFile)('Saving Model');
    const modelData = model.layers.map(layer => ({
        neurons: layer.neurons.map(neuron => ({
            weights: neuron.weights,
            bias: neuron.bias
        }))
    }));
    // Construct the path to the data folder from the current working directory
    const filePath = path.join("data", fileName);
    // Ensure the data directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    // Write the model data to a file in the data folder
    fs.writeFileSync(filePath, JSON.stringify(modelData, null, 2), 'utf8');
}
const nn = new NeuralNetwork_1.NeuralNetwork();
function run() {
    console.log("TRAINING MODEL\n");
    train(network, Dataset_1.dataset, 3, 0.1);
    console.log("Saving Model\n");
    saveModel(network, `model`);
    console.log("Testing the model\n");
    testXOR(nn);
}
run();
