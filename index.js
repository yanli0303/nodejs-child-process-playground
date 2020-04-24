const { fork } = require ('child_process');
const path = require('path');

const process = fork(path.join(__dirname, 'process.js'), undefined, { silent: true });

process.on('message', console.info);
process.on('error', console.error);
process.on('exit', console.warn);

setInterval(() => {
  process.send(`${new Date().toISOString()}`)
}, 2000);

setTimeout(() => process.kill('SIGKILL'), 15000);
