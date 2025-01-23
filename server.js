require('dotenv').config();
const spreadsheetId = process.env.spreadsheetId;
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: './googleKeyFile.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function writeToSheet(values) {
  const range = 'Sheet1!A4';
  const valueInputOption = 'USER_ENTERED';

  const resource = { values };

  try {
    const res = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    return res;
  } catch (error) {
    console.error('error', error);
  }
}

async function readSheet(range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
    const rows = response.data.values;
    return rows;
  } catch (e) {
    console.log('error', e);
  }
  return null;
}

async function getTabsInSheet() {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    return response.data.sheets.map((item) => item.properties.title);
  } catch (e) {
    console.log('error', e);
  }
  return null;
}

// readSheet('Sheet1').then((r) => console.log(r));
// getTabsInSheet().then((r) => console.log(r));

async function getAllData() {
  let result = {};

  let tabs = await getTabsInSheet();

  for (let tab of tabs) {
    let data = await readSheet(tab);
    result[tab] = data;
  }
  return result;
}

getAllData().then((r) => console.log(r));
