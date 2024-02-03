import { Neuron } from "./Neuron";

export class Layer {
    neurons: Neuron[] = [];

    constructor(neuronCount: number, inputCount: number) {
        this.neurons = new Array(neuronCount).fill(null).map(() => new Neuron(inputCount));
    }

    layersForward(inputs: number[]): number[]{
        return this.neurons.map(neuron => neuron.neuronForward(inputs));
    }
}