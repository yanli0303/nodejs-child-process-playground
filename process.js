const keepProcessAliveInterval = setInterval(
  () => console.info('Keeping process alive...'),
  1000 * 60 * 60
);

const stopTimer = () => clearInterval(keepProcessAliveInterval);
[
  'exit', // self exit
  'SIGINT', // catch ctrl-c
  'SIGUSR1', // catch kill
  'SIGUSR2',
  'uncaughtException',
  'SIGTERM',
].forEach((event) => process.on(event, stopTimer));

const sendMessageToParentProcess = (message) => {
  if (process.send) {
    process.send(message);
  } else {
    console.error('FATAL ERROR: "process.send" is not available.');
    clearInterval(keepProcessAliveInterval);
    process.exitCode = 1;
  }
};

process.on('message', (message) => {
  sendMessageToParentProcess(message)
});
