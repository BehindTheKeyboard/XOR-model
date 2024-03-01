export class Neuron {
    weights: number[];
    bias: number = Math.random();

    constructor(inputCount: number) {
        this.weights = Array(inputCount).fill(0).map(() => Math.random() * Math.sqrt(2 / (inputCount + inputCount)) - 0.5);
        // console.log("INITIAL WEIGTHS: ", this.weights);
    }
    //Activation function.
    sigmoid(x: number): number {
        return 1 / (1 + Math.exp(-x));
    }

    neuronForward(inputs: number[]): number {
        const sum = inputs.reduce((acc, input, idx) => acc + input * this.weights[idx], this.bias);
        console.log("SIGMOID ", this.sigmoid(sum));
        return this.sigmoid(sum);
    }

    // New method to update weights and bias
    updateWeights(inputs: number[], learningRate: number, delta: number) {
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
