import { prisma } from '../../prisma/database.js';
import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../index.js';

const Chat___ = {
  createdMessage: {
    subscribe: withFilter(
      (parent, args, info) => {
        console.log({ info });
        pubsub.asyncIterator(['MESSAGE_CREATED']);
      },
      (payload, variables) => {
        // console.log({ payload });
        // console.log({ variables });
        // Only push an update if the comment is on
        // the correct repository for this operation
        // return payload.commentAdded.repository_name === variables.repoFullName;

        return true;
      },
    ),
  },
};

export default Chat___;
