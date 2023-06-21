const express = require('express');
const morgan = require('morgan');
const Mongoose = require('mongoose')

const routers = require('./routes/router');

// Create an Express application
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", routers);

// Middleware for handling undefined routes
app.use((req, res, next) => {
    const error = new Error('Endpoint Not Found');
    error.status = 404;
    next(error);
  });
  
// Error handling middleware
app.use((error, req, res, next) => {
res.status(error.status || 500).json({
    error: {
    message: error.message || 'Internal Server Error',
    },
});
});

const startServer = async () => {
    try {
        await Mongoose.connect('mongodb+srv://kiprotich:WhRcgpv1fKIGPSaX@class-register.fzaugrk.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database');

        // Start the server
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Database connection error:', error);
        // Exit the application if the database connection fails
        process.exit(1);
    }
};

startServer();