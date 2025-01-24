const fs = require('fs');

function saveJson(data, fileName = 'data.json') {
  const jsonData = JSON.stringify(data);
  if (!fileName.includes('.json')) fileName += '.json';
  return fs.writeFileSync(fileName, jsonData);
}

function loadJson(fileName) {
  if (!fileName.includes('.json')) fileName += '.json';
  let data = fs.readFileSync(fileName);
  return JSON.parse(data);
}

module.exports = {
  saveJson,
  loadJson,
};
