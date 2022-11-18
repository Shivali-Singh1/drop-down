const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type item {
    key: String
    value: String
  }

  type Query {
    makes: [item],
    model: [item],
    subModel: [item]
  }
`;

const resolvers = {
  Query: {
    makes() {
      return null;
    },
    model (){
      return item;
    },
    subModel(){
      return item;
    }
  },
};

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",

  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


