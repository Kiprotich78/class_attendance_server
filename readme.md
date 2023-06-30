# Class Attendance Register Server

This repository contains the server-side code for the Class Attendance Register project, written in Node.js.

## Getting Started

To get started with the Class Attendance Register server, please follow the steps below:

### Installation

1. Clone this repository to your local machine:
```shell
   git clone git@github.com:Kiprotich78/class_attendance_server.git
```
2. Navigate to the project directory:
```shell
    cd class_attendance_server
```
3. Install the dependencies using npm:
```shell
    npm install
```

### Environmental Variables

The Class Attendance Register server relies on certain environmental variables to function properly. Before starting the server, you need to set up the following variables:

1. **MONGO_URI**: This is the connection string for your MongoDB atlas database. Make sure you have already registred with MongDB atlas. Set the `MONGO_URI` variable in a `.env` file in the project root directory. The `.env` file should look like this:
```shell
    MONGO_URI=<your-mongodb-connection-string>
```

2. **SECRET_KEY**: This is the secret key used for signing and verifying JSON Web Tokens (JWT). Set the `SECRET_KEY` variable in the same `.env` file:
```shell
    SECRET_KEY=<your-secret-key>
```

To generate a random secret key for your Class Attendance Register server, you can use the following command in Node.js:
```shell
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Running this command will output a randomly generated secret key in hexadecimal format. You can copy this generated key and use it as the value for your SECRET_KEY environmental variable in the .env file.


### Starting the Server

Once you have installed the dependencies and set up the environmental variables, you can start the server by running the following command:
```shell
    npm run dev
```

The server will start running on the specified port, and you should see a message in the console indicating that the server has started successfully.


## API Documentation

For detailed information about the API endpoints and how to use them, please refer to the [API Documentation](apiDocumentation.md).

## Contributor

- Kiprotich Shadrack [kiprotich78](https://github.com/kiprotich78)
