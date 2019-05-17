const express = require('express');
const { RTMClient } = require('@slack/rtm-api');

// express
const app = express();

app.get('/*', (req, res) => {
  res.send(`path: ${req.path}<br>\nquery: ${JSON.stringify(req.query, null, 2)}`);
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`express listening on port ${port}.`);
});

// RTM
const token = process.env.SLACK_TOKEN; // oauth access token
const rtm = new RTMClient(token);

rtm.on('message', ({ text, channel }) => {
  rtm.sendMessage(`You said '${text}'`, channel);
});

(async () => {
  await rtm.start();
  console.log(`rtm start!`);
})();
