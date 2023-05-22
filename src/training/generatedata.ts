import * as tf from '@tensorflow/tfjs';
import { FinancialInformation } from '../util/types';

export function generateTrainingData(numExamples: number): { input: number[][], output: number[][] } {
  const trainingData: number[][] = [];
  const outputData: number[][] = [];

  for (let i = 0; i < numExamples; i++) {
    const age = Math.floor(Math.random() * (80 - 20) + 20); // random age between 20 and 60
    const riskTolerance = Math.floor(Math.random() * 5) + 1; // random number between 1 and 5
    const annualIncome = Math.floor(Math.random() * (500000 - 30000) + 50000); // random annual income between 50000 and 300000
    const currentNetWorth = Math.floor(Math.random() * (1000000 - 5000) + 5000); // random current savings between 5000 and 1000000
    const debt = Math.floor(Math.random()); //not using this for now

    const financialInfo: FinancialInformation = {
        age,
        riskTolerance,
        currentNetWorth,
        annualIncome,
        debt,
    };

    const inputRow: number[] = [
      financialInfo.age,
      financialInfo.riskTolerance,
      financialInfo.currentNetWorth,
      financialInfo.annualIncome,
      financialInfo.debt,
    ];

    let outputRow: number[] = [0, 0, 0];

    if (financialInfo.age >= 20 && financialInfo.age <= 40) {
      outputRow = [1, 0, 0];
    } else if (financialInfo.age >= 10) {
      outputRow = [0, 1, 0];
    } else {
      outputRow = [0, 0, 1];
    }

    trainingData.push(inputRow);
    outputData.push(outputRow);
  }

  return {
    input: trainingData,
    output: outputData,
  };
}


//use this to call in train.ts
// const { input, output } = generateTrainingData(1000); // generate 1000 examples
// await trainAndSaveModel(tf.tensor2d(input), tf.tensor2d(output), 'file://./src/models/model.json'); // train the model and save it to file
