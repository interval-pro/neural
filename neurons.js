const activation = require('./utils').activation;

class InputNeuron {
    constructor() {
        this.output = 0;
    }
  
    feedforward(input) {
      this.output = input;
      return this.output;
    }
}

class HiddenNeuron {
    constructor(inputSize) {
        this.bias = Math.random() * 2 - 1;
        this.weights = Array.from({ length: inputSize }, () => Math.random() * 2 - 1);
        this.output = 0;
    }

    feedforward(inputs) {
        const sum = inputs.reduce((acc, curr, i) => acc + curr * this.weights[i], 0) + this.bias;
        this.output = activation(sum);
        return this.output;
    }
}

module.exports = { InputNeuron, HiddenNeuron };
