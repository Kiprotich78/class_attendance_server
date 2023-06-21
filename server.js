const express = require('express');
const morgan = require('morgan');
const dbConnection = require('./db')

const routers = require('./routes/router');

// Create an Express application
const app = express();
const isConnectedToDb = dbConnection();

if(isConnectedToDb){
    // Middleware
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Routes
    app.use('api', routers);

    // Start the server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
}

