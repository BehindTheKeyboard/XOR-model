export class Neuron {
    weights: number[];
    bias: number = Math.random();

    constructor(inputCount: number) {
        this.weights = Array(inputCount).fill(0).map(() => Math.random() - 0.5);
    }

    // Sigmoid is an activation function
    sigmoid(x: number): number {
        return 1 / (1 + Math.exp(-x));
    }

    // Forward pass through this neuron
    neuronForward(inputs: number[]): number {
        const sum = inputs.reduce((acc, input, idx) => acc + input * this.weights[idx], this.bias);
        return this.sigmoid(sum);
    }
}