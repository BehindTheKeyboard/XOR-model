import { NeuralNetwork } from "./NeuralNetwork";
import { dataset } from "./Dataset";
import { logToFile } from "./Logger";
import * as fs from "fs";
import * as path from "path";

const network = new NeuralNetwork(); // update NueralNetwork constructor if you want to manually set layers

async function train(network: NeuralNetwork, dataset: any[], epochs: number, learningRate: number) {
    for (let epoch = 0; epoch < epochs; epoch++) {
        let totalError = 0;
        dataset.forEach(async dataPoint => {
            const output = network.forward(dataPoint.inputs);
            //console.log(`Training with input: ${dataPoint.inputs}, expected output: ${dataPoint.output}, network output: ${output}`);
            logToFile(`Training with input: ${dataPoint.inputs}, expected output: ${dataPoint.output}, network output: ${output}`);
            // Simple error calculation
            const error = dataPoint.output[0] - output[0];
            totalError += error ** 2;

            // TODO: Backpropogation
            //console.log(`Epoch ${epoch + 1}, Total Error: ${totalError}`);
           logToFile(`Training with input: ${dataPoint.inputs}, expected output: ${dataPoint.output}, network output: ${output}\n`);
        });
    }
}

function testXOR(network: NeuralNetwork) {
    console.log("\nTesting XOR");
    logToFile("\nTesting XOR");
    logToFile("*************************************\n");
    const testCases = [
        { input: [0, 0], expected: 0 },
        { input: [0, 1], expected: 1 },
        { input: [1, 0], expected: 1 },
        { input: [1, 1], expected: 0 }
    ];

    testCases.forEach(async testCase => {
        const output = network.forward(testCase.input);
        // Assuming your network outputs a value between 0 and 1, you might want to round the output
        const predicted = output.map(o => Math.round(o));
        console.log(`Input: [${testCase.input}], Expected: ${testCase.expected}, Predicted: ${predicted}`);
        logToFile(`Input: [${testCase.input}], Expected: ${testCase.expected}, Predicted: ${predicted}`);
    });
}

function saveModel(model: NeuralNetwork, fileName: string) {
    console.log("SAVING MODEL");
    logToFile('Saving Model');
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


const nn = new NeuralNetwork();

function run(): void {
    console.log("TRAINING MODEL\n");
    train(network, dataset, 10000, 0.01);
    console.log("Saving Model\n")
    saveModel(network, `model`);
    console.log("Testing the model\n");
    testXOR(nn);
}

run();