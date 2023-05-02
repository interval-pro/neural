const { readFile } = require('./read-csv.js');
const { NN } = require('./network.js');
const data = readFile('./data.csv');
const { saveModel, loadModel } = require('./save-load.js');

const nn = new NN(2, [10, 10], 1);

nn.train(data, 1000, 0.1);

// saveModel('./model.json', nn);
// Or load a model
//loadModel('./model.json', nn);

data.forEach((row) => {
    const prediction = nn.predict(row.inputs.reverse());
    console.log(`Input: ${row.inputs}, Output: ${row.outputs}, Prediction: ${prediction}`);
});
