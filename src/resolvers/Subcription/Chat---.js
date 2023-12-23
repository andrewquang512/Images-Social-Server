import { prisma } from '../../prisma/database.js';
import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../index.js';

const Chat___ = {
  // https://stackoverflow.com/questions/57714995/prisma2-subscriptions-returns-data-null
  createdMessage: {
    subscribe: withFilter(
      () => {
        return pubsub.asyncIterator(['MESSAGE_CREATED']);
      },
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables }, 'sub');

        return payload.createdMessage.chatId === variables.chatId;
      },
    ),
  },
  updateStatusChat: {
    subscribe: withFilter(
      () => {
        return pubsub.asyncIterator(['UPDATE_STATUS_CHAT']);
      },
      (payload, variables) => {
        console.log(payload.updateStatusChat.userIDs, 'status chat sub');
        console.log({ variables }, 'status chat sub');

        return payload.updateStatusChat.userIDs.includes(variables.userId);
      },
    ),
  },
};

export default Chat___;
