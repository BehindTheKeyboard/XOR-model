import { Layer } from "./Layer";

export class NeuralNetwork {
    layers: Layer[] = [];

    constructor() {
        this.layers = [
            new Layer(2 , 2),
            new Layer(1, 2),
        ];
    }

    forward(input: number[]): number[] {
        let currentOutput = input;
        for (const layer of this.layers) {
            currentOutput = layer.layersForward(currentOutput);
        }
        return currentOutput;
    }
}
