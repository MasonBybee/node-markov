const { MarkovMachine } = require("./markov");
const { text } = require("./testText");

describe("makrov machine tests", function () {
  test("generates class", function () {
    let testMarkov = new MarkovMachine("some sample text");
    expect(testMarkov).not.toEqual(null || undefined);
  });

  test("handles being passed an empty string", function () {
    expect(() => new MarkovMachine()).toThrow(RangeError);
  });

  test("handles short text", function () {
    let testMarkov = new MarkovMachine("one");
    expect(testMarkov.makeText()).toEqual("one");
  });
  test("handles long text and returns proper length", function () {
    let testMarkov = new MarkovMachine(text);
    const length = testMarkov.makeText(8).split(" ").length;
    expect(length).toEqual(8);
  });

  test("generates chains correctly", function () {
    let testMarkov = new MarkovMachine(
      "this is some sample text this will be used for some tests"
    );
    const chains = {
      this: ["is", "will"],
      is: ["some"],
      some: ["sample", "tests"],
      sample: ["text"],
      text: ["this"],
      will: ["be"],
      be: ["used"],
      used: ["for"],
      for: ["some"],
      tests: [null],
    };
    expect(testMarkov.chains).toEqual(chains);
  });

  test("maketext returns a non empty string", function () {});
});
