import app from './app.js';

const PORT = parseInt(parseInt(process.env.PORT)) || 8080;

app.listen(PORT, () =>
  console.log(`Telegram pubsub test listening on port ${PORT}`)
);
