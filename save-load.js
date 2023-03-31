const fs = require('fs');

const saveModel = (filePath, nn) => {
    const modelData = nn.layers.slice(1).map(layer => {
        return layer.map(neuron => {
            return {
                weights: neuron.weights,
                bias: neuron.bias
            };
        });
    });

    fs.writeFileSync(filePath, JSON.stringify(modelData));
};

const loadModel = (filePath, nn) => {
    const modelData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    nn.layers.slice(1).forEach((layer, layerIndex) => {
        layer.forEach((neuron, neuronIndex) => {
            neuron.weights = modelData[layerIndex][neuronIndex].weights;
            neuron.bias = modelData[layerIndex][neuronIndex].bias;
        });
    });
};

module.exports = { saveModel, loadModel };