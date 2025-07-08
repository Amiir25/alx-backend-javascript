process.stdout.write('Welcome to ALX, what is your name?\n');

process.stdin.setEncoding('utf-8');

process.stdin.on('data', (input) => {
  const name = input.trim();
  console.log(`Your name is: ${name}`);
});

// Handle when input stream ends (like when piping input or pressing Ctrl+D)
process.stdin.on('end', () => {
  console.log('This important software is now closing');
});
