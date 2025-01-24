const express = require('express');
const app = express();
const PORT = 3333;

const { getAllDataFromSheet } = require('./googleApi');
const { saveJson } = require('./jsonUtils');

let response;
let data = {
  roots: {},
  words: {},
};

app.get('/roots/:root', (req, res) => {
  return res.json(data.roots[req.params.root]);
});

app.get('/words/:word', (req, res) => {
  return res.json(data.words[req.params.word]);
});

app.get('/roots', (req, res) => {
  let list = Object.keys(data.roots);
  return res.json(list);
});

app.get('/words', (req, res) => {
  let list = Object.keys(data.words);
  return res.json(list);
});

app.get('/response', (req, res) => {
  return res.json(response);
});
app.get('/prefixes', (req, res) => {
  return res.json(data.prefixes || null);
});
app.get('/suffixes', (req, res) => {
  return res.json(data.suffixes || null);
});
app.get('/data', (req, res) => {
  return res.json(data);
});

app.listen(PORT, async () => {
  console.log('initializting');
  await initAppData();
  console.log(`Listening on ${PORT}`);
});

async function initAppData() {
  response = await getAllDataFromSheet();
  saveJson(response);

  // Go through each field
  for (let key in response) {
    let nKey = n(key);
    // Prefix field
    if (nKey.includes('break')) {
      continue;
    } else if (nKey.includes('prefix')) {
      let d = processSheet(response[key]);
      data[n(key)] = d;
      // suffix field
    } else if (nKey.includes('suffix')) {
      let d = processSheet(response[key]);
      data[n(key)] = d;

      // roots fields
    } else {
      let [roots, words] = processRoot(response[key]);
      console.log('roots, words', roots, words);
      data.roots[n(key)] = roots;
    }
  }
}

function processSheet(data) {
  let keys = data[0].map((s) => n(s));
  let result = {};
  for (let item of data.slice(1)) {
    let obj = {};

    item.forEach((val, index) => {
      let k = n(keys[index]);
      obj[k] = val;
    });

    result[item[0]] = obj;
  }
  saveJson(result, 'result.json');
  return result;
}

function processRoot(data) {
  data = data.slice(1); // remove useless line
  let incorrectCounter = 1;
  let keys = data[0].map((s) => {
    if (n(s).includes('incorrect')) s += incorrectCounter++;
    return n(s);
  }); // get the headers
  let words = {};
  let roots = {};

  // Iterate over each word
  for (let item of data.slice(1)) {
    let word = {};
    // Iterate over each key in word data
    item.forEach((val, index) => {
      // get the key
      let k = keys[index];
      // store the key/val
      word[k] = val;
    });
    // Store the whole word
    roots[word['Whole Word']] = word;
  }

  for (let root in roots) {
    for (let word in roots[root]) {
      words[word['WholeWord']] = word.ROOT;
    }
  }

  return [roots, words];
}

// normalize
function n(s) {
  if (typeof s !== 'string') return s;
  return s.toLowerCase().replaceAll(/[\-\s]/g, '');
}
