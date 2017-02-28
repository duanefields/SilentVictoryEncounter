import Random from "random-js";
import _ from "lodash";
import assert from 'assert';

const random = new Random();

// roll a single 6-sided dice
random.roll1D6 = () => random.die(6);

// roll 2 6-sided dice an add them together
random.roll2D6 = () => _.sum(random.dice(6, 2));

// pick a choice via 2d6, adjusted for offset
random.pick2D6 = (array) => {
  assert(array.length === 11, `Expected 11 choices, got ${array.length}: ` + array);
  return array[random.roll2D6() - 2];
}

export default random;
