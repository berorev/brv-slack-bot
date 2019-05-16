const { RTMClient } = require('@slack/rtm-api');

const token = process.env.SLACK_TOKEN; // oauth access token
const rtm = new RTMClient(token);

rtm.on('message', ({ text, channel }) => {
  rtm.sendMessage(`You said '${text}'`, channel);
});

(async () => {
  await rtm.start();
})();
