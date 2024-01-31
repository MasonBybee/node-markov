/** Textual markov chain generator */

const { error } = require("console");

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    if (!text || typeof text !== "string") {
      throw new RangeError("Invalid input: text must be a non-empty string.");
    }
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const markovChain = {};
    this.words.forEach((word, i) => {
      markovChain[word] = markovChain[word]
        ? [...markovChain[word], this.words[i + 1] || null]
        : [this.words[i + 1] || null];
    });
    return markovChain;
  }

  /** return random text from chains */

  getNewWord(prevWord) {}

  makeText(numWords = 100) {
    const wordArr = [this.words[Math.floor(Math.random() * this.words.length)]];

    for (let i = 1; i < numWords; i++) {
      // Start from 1, since we already added one word.
      let prevWord = wordArr[wordArr.length - 1];
      let newWordOptions = this.chains[prevWord];
      let randIdx = Math.floor(Math.random() * newWordOptions.length);

      if (newWordOptions[randIdx] === null) {
        break;
      } else {
        wordArr.push(newWordOptions[randIdx]);
      }
    }

    return wordArr.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
