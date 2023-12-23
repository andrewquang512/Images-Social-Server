import Query from './Query/_Query.js';
import Mutation from './Mutation/_Mutation.js';
import Subscription from './Subcription/_Subscription.js';
import Type from './Type/_Type.js';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  ...Type,
};

export default resolvers;
