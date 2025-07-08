const express = require('express');
const fs = require('fs');

const app = express();

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1); // Skip the header

      const total = students.length;
      const fields = {};

      students.forEach((line) => {
        const parts = line.split(',');
        const firstName = parts[0].trim();
        const field = parts[3].trim();

        if (!fields[field]) fields[field] = [];
        fields[field].push(firstName);
      });

      let output = `Number of students: ${total}`;
      for (const field in fields) {
        output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      }

      resolve(output);
    });
  });
}

const database = process.argv[2];

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello ALX!');
});

app.get('/students', async (req, res) => {
  res.type('text/plain');
  try {
    const result = await countStudents(database);
    res.send(`This is the list of our students\n${result}`);
  } catch (error) {
    res.send('This is the list of our students\nCannot load the database');
  }
});

app.listen(1245);

module.exports = app;
