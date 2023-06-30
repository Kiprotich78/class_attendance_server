# API Documentation

This document provides detailed information about the endpoints available in the Class Attendance Register server.

- [Log In](#login)
- [Sign Up](#signup)
- [Add Student](#add-student)

---

## Login

Authenticate a user and obtain an access token.

- **URL**: `/api/login`
- **Method**: `POST`
- **Request Body**:

  | Field    | Type     | Description             |
  | -------- | -------- | ----------------------- |
  | email    | `email`  | The user's email address|
  | password | `string` | The user's password     |

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**:

  ```json
  {
    "accessToken": "<access-token>"
  }
  ```

- **Description**: Upon successful authentication, an access token is returned. The access token should be included in the `Authorization` header of subsequent API requests for authentication.

- **Example** (JavaScript `fetch`):

  ```javascript
    fetch('http://localhost:4444/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'kiprotich78@gmail.com',
            password: 'pass1234'
        })
    })
        .then(response => response.json())
        .then(data => {
            // Access token received
            console.log(data.accessToken);
        })
        .catch(error => {
            // Handle error
            console.error(error);
        });
   ```

## SignUp

Create a new user account.

- **URL**: `/api/login`
- **Method**: `POST`
- **Request Body**:

  | Field    | Type     | Description             |
  | -------- | -------- | ----------------------- |
  | firstName| `string` | The user's first name   |
  | lastName | `string` | The user's last Name    |
  | email    | `email`  | The user's email address|
  | password | `string` | The user's password     |

- **Response**:

  - **Status Code**: `201 Created`
  - **Content**:

  ```json
    {
      "message": "User created successfully",
      "user": {
          "firstName": "Kiprotich",
          "lastName": "shadrack",
          "email": "shadrackr059@gmail.com"
      }
    }
  ```

- **Description**: Upon successful user creation, a success message is returned along with the user details.

- **Example** (JavaScript `fetch`):

  ```javascript
   fetch('http://localhost:4444/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: 'Kiprotich',
      lastName: 'Shadrack',
      email: 'shadrackr059@gmail.com',
      password: 'secretpassword'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message); // User created successfully
    console.log(data.user); // { firstName: "Kiprotich", lastName: "Shadrack", email: "shadrackr059@gmail.com" }
  })
  .catch(error => {
    console.error(error);
  });

   ```

## Add Student

Add a new student to the system. Authorization is required to access this endpoint.

- **URL**: `/students`
- **Method**: `POST`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **Request Body**:

  | Field      | Type     | Description               |
  | ---------- | -------- | ------------------------- |
  | firstName  | `string` | The student's first name   |
  | lastName   | `string` | The student's last name    |
  | email      | `string` | The student's email address|
  | phone      | `number` | The student's phone number |
  | gender     | `string` | The student's gender       |

- **Response**:

  - **Status Code**: `201 Created`
  - **Content**: N/A

  - **Description**: Upon successful student creation, the server responds with a status code of `201 Created`.

- **Example** (JavaScript `fetch`):

  ```javascript
  const accessToken = "<access-token>";

  fetch('http://localhost:4444/addstudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    },
    body: JSON.stringify({
      firstName: 'Ostine',
      lastName: 'Kipkemoi',
      email: 'ostoo@gmail.com',
      phone: 716009182,
      gender: 'Male'
    })
  })
    .then(response => {
      if (response.status === 201) {
        console.log('Student added successfully');
      } else if (response.status === 401) {
        console.log('Authorization failed');
      } else {
        console.log('An error occurred');
      }
    })
    .catch(error => {
      console.error(error);
    });

    ```
