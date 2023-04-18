import * as tf from '@tensorflow/tfjs';

interface FinancialInformation {
  age: number;
  riskTolerance: number;
  currentNetWorth: number;
  annualIncome: number;
  debt: number;
}

interface Portfolios {
  [key: string]: string[];
}

// Define the investment portfolios
const portfolios: Portfolios = {
  conservative: ['bonds', 'real estate'],
  balanced: ['stocks', 'bonds', 'real estate', 'commodities'],
  aggressive: ['stocks', 'commodities', 'crypto'],
};

export async function generateSuggestion(financialInfo: FinancialInformation): Promise<string> {
  // Define the neural network
  const net = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [5], units: 10, activation: 'sigmoid' }),
      tf.layers.dense({ units: 10, activation: 'sigmoid' }),
      tf.layers.dense({ units: 3, activation: 'softmax' }),
    ],
  });

  // Train the neural network
  const trainingData = tf.tensor2d([
    [25, 2, 100000, 60000, 0],
    [30, 4, 150000, 80000, 20000],
    [40, 6, 200000, 100000, 50000],
    [50, 8, 300000, 120000, 100000],
    [60, 10, 400000, 150000, 150000],
  ]);

  const outputData = tf.tensor2d([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ]);

  const options = {
    epochs: 500,
    learningRate: 0.3,
  };

  net.compile({ optimizer: tf.train.adam(), loss: 'categoricalCrossentropy' });

  await net.fit(trainingData, outputData, options);

  // Use the neural network to generate a suggestion
  const input = tf.tensor2d([
    [financialInfo.age, financialInfo.riskTolerance, financialInfo.currentNetWorth, financialInfo.annualIncome, financialInfo.debt],
  ]) as tf.Tensor;
  
  const output = net.predict(input) as tf.Tensor;
  const probabilities = Array.from(output.dataSync());
  console.log(probabilities);
  const maxProbIndex = probabilities.indexOf(Math.max(...probabilities));
  const suggestedPortfolio = Object.keys(portfolios)[maxProbIndex];
  console.log(suggestedPortfolio);
  return suggestedPortfolio;
}

