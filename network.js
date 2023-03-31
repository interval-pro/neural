const activationDerivative = require('./utils').activationDerivative;
const InputNeuron = require('./neurons').InputNeuron;
const HiddenNeuron = require('./neurons').HiddenNeuron;

class NN {
    constructor(inputSize, hiddenSize, outputSize) {
        this._createLayers(inputSize, hiddenSize, outputSize);
    }

    _createLayers(inputSize, hiddenLayersSizeArray, outputSize) {
        this.inputLayer = Array.from({ length: inputSize }, () => new InputNeuron());
        this.hiddenLayers = hiddenLayersSizeArray.map((hiddenLayerSize, i) => {
            const prevSize = i === 0 ? inputSize : hiddenLayersSizeArray[i - 1];
            return Array.from({ length: hiddenLayerSize }, () => new HiddenNeuron(prevSize));
        });
        this.outputLayer = Array.from({ length: outputSize }, () => new HiddenNeuron(hiddenLayersSizeArray[hiddenLayersSizeArray.length - 1]));
        this.layers = [this.inputLayer, ...this.hiddenLayers, this.outputLayer];
    }

    _feedforward(inputs) {
        this.layers.forEach((layer, layerIndex) => {
            layerIndex === 0
                ? layer.forEach((inputNeuron, inputLayerIndex) => inputNeuron.feedforward(inputs[inputLayerIndex]))
                : layer.forEach((neuron) => neuron.feedforward(this.layers[layerIndex - 1].map((neuron) => neuron.output)));
        });
    }

    _backpropagation(inputs, outputs, learningRate) {
        this._feedforward(inputs);
        for (let layerIndex = this.layers.length - 1; layerIndex > 0; layerIndex--) {
            this.layers[layerIndex].forEach((neuron, neuronIndex) => {
                layerIndex === this.layers.length - 1
                    ? neuron.error = outputs[neuronIndex] - neuron.output
                    : neuron.error = this.layers[layerIndex + 1]
                        .reduce((acc, nextNeuron) => acc + nextNeuron.weights[neuronIndex] * nextNeuron.error, 0);

                const delta = neuron.error * activationDerivative(neuron.output);
                const inputValues = this.layers[layerIndex - 1].map(inputNeuron => inputNeuron.output);
                neuron.weights = neuron.weights
                    .map((weight, weightIndex) => weight + learningRate * delta * inputValues[weightIndex]);
                neuron.bias += learningRate * delta;
            });
        }
    }

    train(data, iterations, learningRate) {
        for (let i = 0; i < iterations; i++) {
            Array.isArray(data)
                ? data.forEach((row) => this._backpropagation(row.inputs, row.outputs, learningRate)) 
                : this._backpropagation(data.inputs, data.outputs, learningRate);
        }
    }

    predict(inputs) {
        this._feedforward(inputs);
        const outputLayer = this.layers[this.layers.length - 1];
        return outputLayer.map(neuron => neuron.output);
    }
}

module.exports = { NN }