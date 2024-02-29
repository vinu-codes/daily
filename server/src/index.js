console.log('Hello, Vinu!');

const express = require('express');

const bodyParser = require('body-parser');

// create the app
const app = express(); // {use: ()=>{}}
const port = process.env.PORT || 5001;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route
const routes = require('./routes');

// consume the route
app.use('/', routes);

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
