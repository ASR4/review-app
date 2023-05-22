import * as tf from '@tensorflow/tfjs-node';
import * as fs from 'fs';
import { FinancialInformation } from '../util/types';

interface Portfolios {
  [key: string]: string[];
}

const portfolios: Portfolios = {
  conservative: ['bonds', 'real estate'],
  balanced: ['stocks', 'bonds', 'real estate', 'commodities'],
  aggressive: ['stocks', 'commodities', 'crypto'],
};

export async function trainAndSaveModel(trainingData: tf.Tensor2D, outputData: tf.Tensor2D): Promise<void> {
  // Define the neural network
  const net = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [5], units: 10, activation: 'sigmoid' }),
      tf.layers.dense({ units: 10, activation: 'sigmoid' }),
      tf.layers.dense({ units: 3, activation: 'softmax' }),
    ],
  });

  const options = {
    epochs: 500,
    learningRate: 0.3,
  };

  net.compile({ optimizer: tf.train.adam(), loss: 'categoricalCrossentropy' });

  await net.fit(trainingData, outputData, options);

  // Save the trained model to persistent memory
  await net.save('file://../models/model.json');
}
