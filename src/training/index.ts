// train.ts
import * as tf from '@tensorflow/tfjs-node';
import { trainAndSaveModel } from '../training/train';
import { FinancialInformation } from '../util/types';

// Define your training data and output data
const trainingData = tf.tensor2d([
  [25, 2, 100000, 60000, 0],
  [30, 4, 150000, 80000, 20000],
  [40, 6, 200000, 100000, 50000],
  [50, 8, 300000, 120000, 100000],
  [60, 10, 400000, 150000, 150000],
]);

const outputData = tf.tensor2d([
  [1, 0, 0], // conservative
  [0, 1, 0], // balanced
  [0, 0, 1], // aggressive
  [0, 1, 0], // balanced
  [0, 0, 1], // aggressive
]);

async function train() {
  await trainAndSaveModel(trainingData, outputData);
}

train();
