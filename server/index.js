const express = require('express');
require('dotenv').config();
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');
const connectDB = require("./config/db");
const schema = require('./schema');
const port = process.env.PORT || 9000;

connectDB();

const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development' ? true : false,
    })
);

app.listen(port, console.log(`> Server is rinning on PORT: ${port}`));