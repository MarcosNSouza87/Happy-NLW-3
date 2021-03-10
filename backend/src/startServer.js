import { ApolloServer } from "apollo-server";

//https://www.apollographql.com/docs/apollo-server/security/authentication/
function startServer({typeDefs,resolvers}){
    const server = new ApolloServer({typeDefs,resolvers})
    server.listen().then(({url}) => console.log(`🚀 Server ready at ${url}`))
}

export default startServer