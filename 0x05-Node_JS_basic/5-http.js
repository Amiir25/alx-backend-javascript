const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1); // Skip header

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
        const list = fields[field].join(', ');
        output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${list}`;
      }

      resolve(output);
    });
  });
}

const database = process.argv[2];

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello ALX!');
  } else if (req.url === '/students') {
    countStudents(database)
      .then((output) => {
        res.end(`This is the list of our students\n${output}`);
      })
      .catch((err) => {
        res.end('This is the list of our students\nCannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
