# API Documentation

This document provides detailed information about the endpoints available in the Class Attendance Register server.

## Login

Authenticate a user and obtain an access token.

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:

  | Field    | Type     | Description             |
  | -------- | -------- | ----------------------- |
  | username | `string` | The user's username     |
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
    fetch('http://localhost:4444/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        username: 'john_doe',
        password: 'secretpassword'
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



