import { mergeResolvers } from 'merge-graphql-schemas';
import Query from './query';
import Mutation from './mutation';
import scalars from './customScalars';

const resolvers = mergeResolvers([Query, Mutation, scalars]);
export default resolvers;
