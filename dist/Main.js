"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const NeuralNetwork_1 = require("./NeuralNetwork");
const Dataset_1 = require("./Dataset");
const Logger_1 = require("./Logger");
const fs = require("fs");
const path = require("path");
const network = new NeuralNetwork_1.NeuralNetwork(); // update NueralNetwork constructor if you want to manually set layers
function train(network, dataset, epochs, learningRate) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let epoch = 0; epoch < epochs; epoch++) {
            let totalError = 0;
            dataset.forEach((dataPoint) => __awaiter(this, void 0, void 0, function* () {
                const output = network.forward(dataPoint.inputs);
                //console.log(`Training with input: ${dataPoint.inputs}, expected output: ${dataPoint.output}, network output: ${output}`);
                (0, Logger_1.logToFile)(`Training with input: ${dataPoint.inputs}, expected output: ${dataPoint.output}, network output: ${output}`);
                // Simple error calculation
                const error = dataPoint.output[0] - output[0];
                totalError += error ** 2;
                // TODO: Backpropogation
                //console.log(`Epoch ${epoch + 1}, Total Error: ${totalError}`);
                (0, Logger_1.logToFile)(`Training with input: ${dataPoint.inputs}, expected output: ${dataPoint.output}, network output: ${output}\n`);
            }));
        }
    });
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
    testCases.forEach((testCase) => __awaiter(this, void 0, void 0, function* () {
        const output = network.forward(testCase.input);
        // Assuming your network outputs a value between 0 and 1, you might want to round the output
        const predicted = output.map(o => Math.round(o));
        console.log(`Input: [${testCase.input}], Expected: ${testCase.expected}, Predicted: ${predicted}`);
        (0, Logger_1.logToFile)(`Input: [${testCase.input}], Expected: ${testCase.expected}, Predicted: ${predicted}`);
    }));
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
    train(network, Dataset_1.dataset, 10000, 0.01);
    console.log("Saving Model\n");
    saveModel(network, `model`);
    console.log("Testing the model\n");
    testXOR(nn);
}
run();
