// https://firebase.google.com/docs/cloud-messaging/send-message
import { firebaseMessaging } from './index.js';

export const sendNotificationToClient = (tokens, data, notification) => {
  // Send a message to the devices corresponding to the provided
  // registration tokens.
  firebaseMessaging
    .sendMulticast({ tokens, data, notification })
    .then((response) => {
      // Response is an object of the form { responses: [] }
      const successes = response.responses.filter(
        (r) => r.success === true,
      ).length;

      const failures = response.responses.filter(
        (r) => r.success === false,
      ).length;

      console.log(
        'Notifications sent:',
        `${successes} successful, ${failures} failed`,
      );
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};
