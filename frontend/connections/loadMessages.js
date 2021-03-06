import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async (conversationId) => {
  try {
    var messages;

    await (await fetch(serverURL + `/messages/${conversationId}`))
      .json()
      .then((res) => {
        messages = res.data;
        ('');
      })
      .catch((err) => console.log('Error fetching messages', err));

    return messages;
  } catch (error) {
    return console.error(error);
  }
};
