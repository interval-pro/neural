const activation = (sum) => 1 / (1 + Math.exp(-sum));
const activationDerivative = (output) => output * (1 - output);

module.exports = { activation, activationDerivative };