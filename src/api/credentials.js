const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyfXgn8PL6pB3x32' }).base(
  'appjWdL7YgpxIxCKA'
);

const table = base('credenitals');

export const getRecords = async () => {
  const records = await table.select().firstPage();
  return records;
};
