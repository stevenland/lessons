import { pickNumber } from "../../common/utils";

/**
 * Create a pair of protons, return value is an object
 * e.g.
 * {
 *   proton: 1,
 * 	 protonText: '1P',
 *   anti: 2,
 * 	 antiText: '2A',
 *   pair: -1
 * }
 */
export const createProtonsPair = () => {
  const pNum = pickNumber(1, 6);
  const aNum = pickNumber(1, 6);
  const pairNum = pNum - aNum;
  return {
    proton: pNum,
    protonText: pNum + "P",
    anti: aNum,
    antiText: aNum + "A",
    pair: pairNum
  };
};

/**
 * Create an equation based on level(1, or 2)
 * @param {bool|number} expert
 * e.g.
 * [{number: 3, proton: 1 },
 *  {number: 5, proton: -1, operator: -1},
 *  {number: 2, proton: 1, operator: -1}]
 */
export const createProtonsEquation = (expert = false) => {
  const equation = [];
  equation[0] = {
    number: pickNumber(1, 6),
    proton: Math.random() > 0.5 ? 1 : -1 // 1 - Proton, 2 - Anti-proton
  };
  equation[1] = {
    number: pickNumber(1, 6),
    proton: Math.random() > 0.5 ? 1 : -1,
    operator: Math.random() > 0.5 ? 1 : -1
  };
  if (expert) {
    equation[2] = {
      number: pickNumber(1, 6),
      proton: Math.random() > 0.5 ? 1 : -1,
      operator: Math.random() > 0.5 ? 1 : -1
    };
  }
  return equation;
};

/**
 * Given the equation generated by createProtonsEquation() and return its answer
 * @param {array} equation
 * @returns number
 */
export const computeAnswer = equation => {
  let answer =
    equation[0].number * equation[0].proton +
    equation[1].number * equation[1].proton * equation[1].operator;
  if (equation[2]) {
    answer += equation[2].number * equation[2].proton * equation[2].operator;
  }
  return answer;
};

/**
 * Convert input to its corresponding number.
 * e.g. 2P => 2
 * 3A => -3
 * 0P or 0A or 0 => 0
 */
export const convertInput = input => {
  input = input.trim();
  if (Number(input) === 0) {
    return 0;
  }
  if (input.toLowerCase() === "p") {
    return 1;
  }
  if (input.toLowerCase() === "a") {
    return -1;
  }
  const proton = input[input.length - 1];
  const number = Number(input.substring(0, input.length - 1));
  return proton.toLowerCase() === "p" ? number : -1 * number;
};

/**
 * Create protons grid for sub-lesson three
 * @param {number|bool} operator , 1/true: '+', 0/false: '-'
 */
export const createProtonsGrid = operator => {
  const patterns = [
    ["00", "15", "22", "25", "33", "34", "41", "44", "52", "53"],
    ["02", "13", "14", "21", "31", "35", "42", "43", "54", "55"],
    ["02", "11", "14", "22", "23", "33", "34", "41", "45", "55"],
    ["03", "13", "15", "24", "31", "32", "41", "45", "52", "53"],
    ["03", "12", "15", "22", "24", "31", "35", "44", "51", "53"],
    ["04", "11", "13", "21", "25", "34", "35", "42", "52", "53"],
    ["04", "13", "15", "21", "34", "35", "42", "43", "51", "52"],
    ["05", "11", "22", "23", "33", "34", "41", "44", "52", "55"],
    ["05", "11", "14", "24", "25", "32", "41", "43", "52", "53"],
    ["13", "14", "22", "23", "32", "35", "41", "45", "50", "54"],
    ["12", "14", "23", "25", "32", "33", "41", "45", "50", "54"],
    ["12", "13", "21", "24", "31", "35", "42", "45", "50", "53"],
    ["14", "15", "20", "21", "32", "35", "43", "44", "51", "53"],
    ["11", "15", "20", "24", "31", "34", "43", "45", "52", "53"],
    ["12", "15", "21", "22", "30", "33", "43", "44", "54", "55"],
    ["14", "15", "22", "24", "30", "31", "42", "43", "51", "53"],
    ["12", "13", "24", "25", "31", "34", "40", "41", "53", "55"],
    ["13", "15", "23", "24", "31", "32", "40", "44", "51", "55"]
  ];

  const pattern = patterns[pickNumber(0, patterns.length - 1)];
  const protonsGrid = [];
  protonsGrid[0] = [];
  protonsGrid[0][0] = operator ? "+" : "-";
  for (let i = 1; i <= 5; i++) {
    const sign = Math.random() > 0.5 ? 1 : -1;
    protonsGrid[0][i] = {
      number: pickNumber(1, 9) * sign,
      show: pattern.indexOf(`0${i}`) >= 0 ? true : false,
      check: null,
      answer: ""
    };
  }
  for (let i = 1; i <= 5; i++) {
    const sign = Math.random() > 0.5 ? 1 : -1;
    protonsGrid[i] = [];
    protonsGrid[i][0] = {
      number: pickNumber(1, 9) * sign,
      show: pattern.indexOf(`${i}0`) >= 0 ? true : false,
      check: null,
      answer: ""
    };
  }
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      protonsGrid[i][j] = {
        number: operator
          ? protonsGrid[i][0].number + protonsGrid[0][j].number
          : protonsGrid[i][0].number - protonsGrid[0][j].number,
        show: pattern.indexOf(`${i}${j}`) >= 0 ? true : false,
        check: null,
        answer: ""
      };
    }
  }

  return protonsGrid;
};

/**
 * Check if it input is valid
 * Return true if valid, otherwise return false.
 * e.g. 0 -> true, 3a -> true, 3aa -> false, a3 -> false
 * @param {string} input
 */
export const validateInput = input => {
  const re = /^\d*[apAP]?$/;
  if (!re.test(input)) {
    return false;
  }
  if (
    Number(input) !== 0 &&
    ["a", "p", "A", "P"].indexOf(input[input.length - 1]) === -1
  ) {
    return false;
  }
  return true;
};
