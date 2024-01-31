/** Command-line tool to generate Markov text. */

const fs = require("fs").promises;
const axios = require("axios");
const { MarkovMachine } = require("./markov");
const args = process.argv;

async function genText() {
  let data;
  if (args[2] === "file") {
    try {
      data = await fs.readFile(String(args[3]), "utf8");
      const markov = new MarkovMachine(data);
      return markov.makeText(100);
    } catch (err) {
      console.log("Error: Unable to read from file", err);
    }
  } else if (args[2] == "url") {
    try {
      let { data } = await axios.get(`${args[3]}`);
      const markov = new MarkovMachine(data);
      return markov.makeText(100);
    } catch (e) {
      console.log("Error: Unable to read from url", e);
    }
  }
}

genText().then((text) => console.log(text));
