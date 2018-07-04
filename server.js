import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';

const app = express();


app.use(compression());
app.use(
  '/graphql', 
  bodyParser.json(), 
  graphqlExpress({
     schema, 
     tracing: true 
    })
  );
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


const GRAPHQL_PORT = 3000;
const ENGINE_API_KEY = 'service:tammyztian:lU6T7mfli9wNLDUKK-GgAQ';

const engine = new ApolloEngine({
    apiKey: ENGINE_API_KEY,
})

engine.listen({
  port: GRAPHQL_PORT,
  expressApp: app,
});


// app.listen(GRAPHQL_PORT, () =>
//   console.log(
//     `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
//   )
// );
