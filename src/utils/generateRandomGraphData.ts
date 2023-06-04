import {GraphPoint} from 'react-native-graph';

const weightedRandom = (): number => {
  var min = 1000;
  var max = 14000;

  return Math.floor(Math.random() * (max - min) + min);
};

export const generateRandomGraphData = (length: number): GraphPoint[] => {
  return Array<number>(length)
    .fill(0)
    .map((_, index) => ({
      date: new Date(
        new Date(2000, 0, 1).getTime() + 1000 * 60 * 60 * 24 * index,
      ),
      value: weightedRandom(),
    }));
};
