const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://kiprotich:WhRcgpv1fKIGPSaX@class-register.fzaugrk.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');

    // Return a success indicator or do any other post-connection setup if needed
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    // Exit the application if the database connection fails
    process.exit(1);
  }
};

module.exports = connectToDatabase;
