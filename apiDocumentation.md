# API Documentation

- **Author**: Kiprotich Shadrack
- **GitHub**: [Kiprotich78](https://github.com/kiprotich78)

This document provides detailed information about the endpoints available in the Class Attendance Register server.

- [Log In](#login)
- [Sign Up](#signup)
- [Student Routes](#student-routes)
  - [Add Student](#add-student)
  - [View single Student Details](#view-single-student-details)
  - [View All Students](#view-all-students)
  - [Add Single Student Unit](#add-single-student-unit)
  - [View Single Student Total Units](#view-single-student-total-units)
  - [View Single Student Total Lessons](#view-single-student-total-lessons)
- [Unit Routes](#unit-routes)
  - [Add Unit](#add-unit)
  - [View All Units](#view-all-units)
  - [Add Lesson To Unit](#add-lesson-to-unit)
  - [Get All Lessons In a Unit](#get-all-lessons-in-a-unit)
- [Attendance Routes](#attendance-routes)
  - [Generate QR Code](#generate-qr-code)
  - [Take Student Attendance](#take-student-attendance)
  - [Filter Attendance By Unit](#filter-attendance-by-unit)
  - [Filter Attendance By Date](#filter-attendance-by-date)
---

### Login

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
    "message": "success",
    "lecturer": {
        "_id": "64985f3b7c9a347ae6e758ea",
        "firstName": "Kipro",
        "lastName": "shadrack",
        "email": "shadrackr058@gmail.com"
    },
    "accessToken": "<accessToken>"

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

### SignUp

Create a new user account.

- **URL**: `/api/signup`
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

## Student Routes

### Add Student

Add a new student to the system. Authorization is required to access this endpoint.

- **URL**: `/api/addstudent`
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
  - **Content**: 
      ```json
        {
          "message": "Student added successfully",
          "student": {
            "firstName": "Ostine",
            "lastName": "Kipkemoi",
            "email": "ostoo@gmail.com",
            "regNo": "stud-0006"
          }
        }

      ```

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
      console.log(data.message); // Student added successfully
      console.log(data.student); // { firstName: "Ostine", lastName: "Kipkemoi", email: "ostoo@gmail.com", regNo: "stud-0006" }
    })
    .catch(error => {
      console.error(error);
    });

    ```


### View Single Student Details

Retrieve details of a single student, including the number of units taken and lessons attended or missed.

- **URL**: `/api/studentDetails/:studentId`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json` (Required)
  - `Authorization: <access-token>` (Required)

- **URL Parameters**:
  - `studentId`: The unique identifier of the student (e.g., `64a1d4af6de161f0ac7b24a9`)

- **Request Body**: None

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
      ```json
          {
          "firstName": "Kiprotich",
          "lastName": "shadrack",
          "registrationNumber": "stud-0002",
          "email": "kipro@gmail.com",
          "phone": 716009182,
          "gender": "Male",
          "totalUnitsTaken": 3,
          "units": [
              {
                  "unitName": "Unit Two",
                  "attendedLessons": 2,
                  "missedlessons": 1,
                  "lessons": [
                      {
                          "_id": "649c7d765655dc0f01b695f9",
                          "lessonName": "lesson One",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": true
                      },
                      {
                          "_id": "649c7d825655dc0f01b69601",
                          "lessonName": "lesson Two",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": true
                      },
                      {
                          "_id": "649c7d8d5655dc0f01b69606",
                          "lessonName": "lesson Three",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": false
                      }
                  ]
              },
              {
                  "unitName": "Unit One",
                  "attendedLessons": 2,
                  "missedlessons": 1,
                  "lessons": [
                      {
                          "_id": "649c7c77d4441b991aa4d6c3",
                          "lessonName": "lesson One",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": true
                      },
                      {
                          "_id": "649c7d0e5655dc0f01b695ef",
                          "lessonName": "lesson Two",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": true
                      },
                      {
                          "_id": "649c7d155655dc0f01b695f4",
                          "lessonName": "lesson Three",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": false
                      }
                  ]
              },
              {
                  "unitName": "Unit Six",
                  "attendedLessons": 0,
                  "missedlessons": 4,
                  "lessons": [
                      {
                          "_id": "649c7ed85655dc0f01b69638",
                          "lessonName": "lesson Three",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": false
                      },
                      {
                          "_id": "649c7eeb5655dc0f01b6963d",
                          "lessonName": "lesson Two",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": false
                      },
                      {
                          "_id": "649c7ef55655dc0f01b69642",
                          "lessonName": "lesson One",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": false
                      },
                      {
                          "_id": "64a5724083ae88c26c22f101",
                          "lessonName": "lesson Four",
                          "date": "2023-07-28T08:00:00.627Z",
                          "startTime": "0900",
                          "duration": 60,
                          "attended": false
                      }
                  ]
              }
          ]
      }
      ```
      - **Description**: Returns a JSON object containing the student details, including the number of units taken and lessons attended and missed. Each unit includes its name, the number of attended lessons, the number of missed lessons, and the lessons details (including the lesson ID, name, date, start time, duration, and attended status).

- **Example** (JavaScript `fetch`):

  ```javascript
    const accessToken = "<access-token>";
    const studentId = "649c79648f38a5a3ea9a2861";

    fetch(`http://localhost:4444/api/studentDetails/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Student details including units and lessons
      })
      .catch(error => {
        console.error(error);
      });


### View All Students

Retrieve a list of all students from the system. Authorization is required to access this endpoint.

- **URL**: `/api/getAllStudents`
- **Method**: `GET`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
      ```json
      {
        "total": 2,
        "students": [ 
            {
                "_id": "649c79218f38a5a3ea9a285c",
                "lecturerId": "64986412c9ad1e7fdac932ff",
                "firstName": "Jane",
                "lastName": "doe",
                "registrationNumber": "stud-0001",
                "email": "hilda@gmail.com",
                "phone": 716009187,
                "gender": "Female",
                "__v": 0
            },
            {
                "_id": "649c79648f38a5a3ea9a2861",
                "lecturerId": "64986412c9ad1e7fdac932ff",
                "firstName": "Kiprotich",
                "lastName": "shadrack",
                "registrationNumber": "stud-0002",
                "email": "kipro@gmail.com",
                "phone": 716009182,
                "gender": "Male",
                "__v": 0
            }
        ]
      }
      ```

  - **Description**: Upon successful retrieval of all students, the server responds with a status code of `200 OK` and returns a JSON object containing an array of student objects.

- **Example** (JavaScript `fetch`):

  ```javascript
  const accessToken = "<access-token>";

  fetch('http://localhost:4444/getAllStudents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.students); 
    })
    .catch(error => {
      console.error(error);
    });

### Add Single Student Unit

Add a single unit to a student. Authorization is required to access this endpoint.

- **URL**: `/api/addStudentUnit/:studentId`
- **Method**: `POST`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **URL Parameters**:
  - `studentId`: The unique identifier of the student (e.g., `64a1d4af6de161f0ac7b24a9`)

- **Request Body**:

  | Field    | Type     | Description                |
  | -------- | -------- | ---------------------------|
  | unitId   | `string` | The unique unit identifier |

- **Response**:

  - **Status Code**: `201 Created`
  - **Content**: 
      ```json
        {
          "msg": "unit added successfully",
          "unit": {
              "student": "64a1d4af6de161f0ac7b24a9",
              "unit": "649c79f38f38a5a3ea9a2873",
              "_id": "64a5551e83ae88c26c22f0e3",
              "__v": 0
          }
        }
      ```

  - **Description**: Upon successful addition of a unit to the student, the server responds with a status code of `201 Created` and returns a JSON object containing a success message and the added unit details.

- **Example** (JavaScript `fetch`):

  ```javascript
  const accessToken = "<access-token>";
  const studentId = "12345";

  fetch(`http://localhost:4444/api/addStudentUnit/${studentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    },
    body: JSON.stringify({
      unitId: "649c79f38f38a5a3ea9a2873"
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.msg); // Unit added successfully
      console.log(data.unit); // 
    })
    .catch(error => {
      console.error(error);
    });
  ```

### View Single Student Total Units

Retrieve the total units of a single student. Authorization is required to access this endpoint.

- **URL**: `/api/getStudentUnits/:studentId`
- **Method**: `GET`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **URL Parameters**:
  - `studentId`: The unique identifier of the student (e.g., `649c79648f38a5a3ea9a2861`)

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
      ```json
      {
        "total": 3,
        "units": [
          {
            "_id": "649c8de6bce0c1059e0ad3a1",
            "student": "649c79648f38a5a3ea9a2861",
            "unit": {
              "_id": "649c79f98f38a5a3ea9a2877",
              "lecturerId": "64986412c9ad1e7fdac932ff",
              "name": "Unit Two",
              "__v": 0
            },
            "__v": 0
          },
          {
            "_id": "649c8df7bce0c1059e0ad3a7",
            "student": "649c79648f38a5a3ea9a2861",
            "unit": {
              "_id": "649c79f38f38a5a3ea9a2873",
              "lecturerId": "64986412c9ad1e7fdac932ff",
              "name": "Unit One",
              "__v": 0
            },
            "__v": 0
          },
          {
            "_id": "649c9ffa0e86d503e6775d90",
            "student": "649c79648f38a5a3ea9a2861",
            "unit": {
              "_id": "649c7b70d4441b991aa4d6b8",
              "lecturerId": "64986412c9ad1e7fdac932ff",
              "name": "Unit Six",
              "__v": 0
            },
            "__v": 0
          }
        ]
      }
      ```

  - **Description**: Upon successful retrieval of the total units for the student, the server responds with a status code of `200 OK` and returns a JSON object containing the total number of units (`total`) and an array of units (`units`) associated with the student.

- **Example** (JavaScript `fetch`):

  ```javascript
  const accessToken = "<access-token>";
  const studentId = "649c79648f38a5a3ea9a2861";

  fetch(`http://localhost:4444/api/getStudentUnits/${studentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.total); // 3
      console.log(data.units); // Array of unit objects
    })
    .catch(error => {
      console.error(error);
    });
  ```

### View Single Student Total Lessons

Retrieve the total lessons for perticular units of a single student. Authorization is required to access this endpoint.

- **URL**: `/api/getStudentLessons/:studentId`
- **Method**: `GET`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **URL Parameters**:
  - `studentId`: The unique identifier of the student (e.g., `649c79648f38a5a3ea9a2861`)

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
      ```json
      {
        "_id": "649c79648f38a5a3ea9a2861",
        "name": "Kiprotich Shadrack",
        "registrationNumber": "stud-0002",
        "totalUnits": 3,
        "units": [
          {
            "unitId": "649c79f98f38a5a3ea9a2877",
            "unitName": "Unit Two",
            "totalLessons": 3,
            "lessons": [
              {
                "_id": "649c7d765655dc0f01b695f9",
                "lessonName": "Lesson One",
                "date": "2023-07-28T08:00:00.627Z"
              },
              {
                "_id": "649c7d825655dc0f01b69601",
                "lessonName": "Lesson Two",
                "date": "2023-07-28T08:00:00.627Z"
              },
              {
                "_id": "649c7d8d5655dc0f01b69606",
                "lessonName": "Lesson Three",
                "date": "2023-07-28T08:00:00.627Z"
              }
            ]
          },
          {
            "unitId": "649c79f38f38a5a3ea9a2873",
            "unitName": "Unit One",
            "totalLessons": 3,
            "lessons": [
              {
                "_id": "649c7c77d4441b991aa4d6c3",
                "lessonName": "Lesson One",
                "date": "2023-07-28T08:00:00.627Z"
              },
              {
                "_id": "649c7d0e5655dc0f01b695ef",
                "lessonName": "Lesson Two",
                "date": "2023-07-28T08:00:00.627Z"
              },
              {
                "_id": "649c7d155655dc0f01b695f4",
                "lessonName": "Lesson Three",
                "date": "2023-07-28T08:00:00.627Z"
              }
            ]
          },
          {
            "unitId": "649c7b70d4441b991aa4d6b8",
            "unitName": "Unit Six",
            "totalLessons": 3,
            "lessons": [
              {
                "_id": "649c7ed85655dc0f01b69638",
                "lessonName": "Lesson Three",
                "date": "2023-07-28T08:00:00.627Z"
              },
              {
                "_id": "649c7eeb5655dc0f01b6963d",
                "lessonName": "Lesson Two",
                "date": "2023-07-28T08:00:00.627Z"
              },
              {
                "_id": "649c7ef55655dc0f01b69642",
                "lessonName": "Lesson One",
                "date": "2023-07-28T08:00:00.627Z"
              }
            ]
          }
        ]
      }
      ```

  - **Description**: Returns the total lessons of a single student, along with their details.

- **Example** (JavaScript `fetch`):

  ```javascript
  const accessToken = "<access-token>";
  const studentId = "649c79648f38a5a3ea9a2861";

  fetch(`http://localhost:4444/api/getStudentLessons/${studentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  ```



## Unit Routes

### Add Unit

Add a new unit to the system. Authorization is required to access this endpoint.

- **URL**: `/api/addUnit`
- **Method**: `POST`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **Request Body**:

  | Field       | Type     | Description                |
  | ----------- | -------- | -------------------------- |
  | name        | `string` | The name of the unit       |

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
      ```json
      {
        "msg": "Unit Added Successfully",
        "unit": {
          "lecturerId": "64986412c9ad1e7fdac932ff",
          "name": "Installation and Customization",
          "_id": "64a56c8d83ae88c26c22f0f6",
          "__v": 0
        }
      }
      ```

  - **Description**: Returns a success message and the details of the newly added unit.

- **Example** (JavaScript `fetch`):

  ```javascript
  const accessToken = "<access-token>";

  fetch('http://localhost:4444/api/addUnit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    },
    body: JSON.stringify({
      name: 'Installation and customization'
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  ```

### View All Units

Retrieve all units from the system. Authorization is required to access this endpoint.

- **URL**: `/api/getAllUnits`
- **Method**: `GET`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
      ```json
      {
      "total": 3,
      "units": [
          {
            "_id": "649c79f38f38a5a3ea9a2873",
            "lecturerId": "64986412c9ad1e7fdac932ff",
            "name": "Unit One",
            "__v": 0
          },
          {
              "_id": "649c79f98f38a5a3ea9a2877",
              "lecturerId": "64986412c9ad1e7fdac932ff",
              "name": "Unit Two",
              "__v": 0
          },
          {
              "_id": "649c79ff8f38a5a3ea9a287b",
              "lecturerId": "64986412c9ad1e7fdac932ff",
              "name": "Unit Three",
              "__v": 0
          }
        ]
      }
      ```

  - **Description**: Returns an array of all units in the system.

- **Example** (JavaScript `fetch`):

  ```javascript
    const accessToken = "<access-token>";

    fetch('http://localhost:4444/api/getAllUnits', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json', 
        'Authorization': `${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  ```

### Add Lesson To Unit

Add a new lesson to a specific unit. Authorization is required to access this endpoint.

- **URL**: `/api/addLesson/:unitId`
- **Method**: `POST`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **URL Parameters**:
  - `unitId` (Required): The ID of the unit to which the lesson will be added.

- **Request Body**:

  | Field       | Type            | Description                                 |
  | ----------- | --------        | --------------------------------------------|
  | lessonName  | `string`        | The name of the lesson                      | 
  | date        | `dateISOString` | The date of the lesson                      |
  | startTime   | `string`        | The start time of the lesson (e.g., "0900") |
  | duration    | `string`        | The duration of the lesson in minutes       |

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
      ```json
      {
        "msg": "Lesson Added Successfully",
        "lesson": {
          "_id": "64a56c8d83ae88c26c22f0f6",
          "unitId": "649c79f98f38a5a3ea9a2877",
          "lessonName": "Lesson One",
          "date": "2023-07-28T08:00:00.627Z",
          "startTime": "0900",
          "duration": "60"
        }
      }
      ```

  - **Description**: Returns a success message and the details of the newly added lesson.

- **Example** (JavaScript `fetch`):

  ```javascript
  const accessToken = "<access-token>";
  const unitId = "649c79f98f38a5a3ea9a2877";

  fetch(`http://localhost:4444/api/addLesson/${unitId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${accessToken}`
    },
    body: JSON.stringify({
      lessonName: 'Lesson One',
      date: '2023-07-28T08:00:00.627Z',
      startTime: '0900',
      duration: '60'
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
   ```

### Get All Lessons in a Unit

Retrieve all lessons belonging to a specific unit. Authorization is required to access this endpoint.

- **URL**: `/api/getAllLessons/:unitId`
- **Method**: `GET`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **URL Parameters**:
  - `unitId` (Required): The ID of the unit to fetch the lessons from.

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
      ```json
      {
        "total": 3,
        "lessons": [
          {
            "_id": "649c7d765655dc0f01b695f9",
            "lessonName": "Lesson One",
            "unitID": "649c79f98f38a5a3ea9a2877",
            "date": "2023-07-28T08:00:00.627Z",
            "startTime": "0900",
            "duration": 60,
            "__v": 0
          },
          {
            "_id": "649c7d825655dc0f01b69601",
            "lessonName": "Lesson Two",
            "unitID": "649c79f98f38a5a3ea9a2877",
            "date": "2023-07-28T08:00:00.627Z",
            "startTime": "0900",
            "duration": 60,
            "__v": 0
          },
          {
            "_id": "649c7d8d5655dc0f01b69606",
            "lessonName": "Lesson Three",
            "unitID": "649c79f98f38a5a3ea9a2877",
            "date": "2023-07-28T08:00:00.627Z",
            "startTime": "0900",
            "duration": 60,
            "__v": 0
          }
        ]
      }
      ```

  - **Description**: Returns the total number of lessons and an array of lesson objects belonging to the specified unit.

- **Example** (JavaScript `fetch`):

  ```javascript
  const accessToken = "<access-token>";
  const unitId = "649c79f98f38a5a3ea9a2877";

  fetch(`http://localhost:4444/api/getAllLessons/${unitId}`, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  ```

## Attendance Routes

  ### Generate QR Code

  Generate a QR code for a specific lesson within a unit.

  - **URL**: `/api/qrcode`
  - **Method**: `GET`
  - **Headers**:
    - `Authorization: <access-token>` (Required)

  - **Query Parameters**:
    - `unitId` (Required): The ID of the unit associated with the lesson.
    - `lessonId` (Required): The ID of the lesson to generate the QR code for.

  - **Response**:

    - **Status Code**: `200 OK`
    - **Content**: 
      ```json
        {
          "msg": "Success",
          "imgUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAADUCAYAAADk3g0YAAAAAkl..."
        }

      ```

    - **Description**: The response will be the generated QR code image file, allowing you to display or download it as needed.

  - **Example** (JavaScript `fetch`):

    ```javascript
    const accessToken = "<access-token>";
    const unitId = "649c79f98f38a5a3ea9a2877";
    const lessonId = "649c7d765655dc0f01b695f9";

    fetch(`http://localhost:4444/api/qrcode?unitId=${unitId}&lessonId=${lessonId}`, {
      method: 'GET',
      headers: {
        'Authorization': `${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(date)
      })
      .catch(error => {
        console.error(error);
      });

      ```

  ### Take Student Attendance

  Record the attendance of a student for a specific lesson. No authorization is required to access this endpoint.

  - **URL**: `/api/attendance`
  - **Method**: `POST`
  - **Headers**:
    - `Content-Type: application/json` (Required)

  - **Request Body**:

    | Parameter   | Type     | Required | Description                             |
    |-------------|----------|----------|---------------------------------------- |
    | lecturerId  | string   | Yes      | The ID of the lecturer.                 |
    | studentId   | string   | Yes      | The ID of the student.                  |
    | unitId      | string   | Yes      | The ID of the unit.                     |
    | lessonId    | string   | Yes      | The ID of the lesson.                   |

    - **Example**: 
      ```json
        {
          "lecturerId": "64986412c9ad1e7fdac932ff",
          "studentId": "649c79218f38a5a3ea9a285c",
          "unitId": "649c79f98f38a5a3ea9a2877",
          "lessonId": "649c7d8d5655dc0f01b69606"
        }

  - **Response**:
    - **Status Code**: `200 ok`
    - **Content**:
      ```json
        {
          "message": "Attendance taken successfully",
          "attendance": {
              "lecturerId": "64986412c9ad1e7fdac932ff",
              "studentId": "649c79218f38a5a3ea9a285c",
              "unitId": "649c79f98f38a5a3ea9a2877",
              "lessonId": "649c7d8d5655dc0f01b69606",
              "_id": "64a577ef83ae88c26c22f11b",
              "createdAt": "2023-07-05T14:02:23.962Z",
              "updatedAt": "2023-07-05T14:02:23.962Z",
              "__v": 0
          }
        }
      ```
    - **Description**: Returns a success message along with the attendance object containing the details of the recorded attendance.

  - **Example**: (Javascript `fetch`):
    ```javascript
      const requestBody = {
        "lecturerId": "64986412c9ad1e7fdac932ff",
        "studentId": "649c79218f38a5a3ea9a285c",
        "unitId": "649c79f98f38a5a3ea9a2877",
        "lessonId": "649c7d8d5655dc0f01b69606"
      };

      fetch("http://localhost:4444/api/attendance", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    ```

  ### Filter Attendance by Unit

  Retrieve attendance details for all lessons in a specific unit. Authorization is required to access this endpoint.

  - **URL**: `/api/filterByUnit/:unitId`
  - **Method**: `GET`
  - **Headers**:
    - `Authorization: <access-token>` (Required)

  - **URL Parameters**:
    - `unitId` (Required): The ID of the unit to filter the attendance for.

  - **Response**:

    - **Status Code**: `200 OK`
    - **Content**: 
      ```json
      [
        {
          "_id": "649c7ed85655dc0f01b69638",
          "lesson": "Lesson Three",
          "date": "2023-07-28T08:00:00.627Z",
          "allStudents": 1,
          "presentStudents": 0,
          "absentStudents": 1,
          "students": [
            {
              "_id": "649c79648f38a5a3ea9a2861",
              "firstName": "Kiprotich",
              "lastName": "Shadrack",
              "registationNumber": "stud-0002",
              "email": "kipro@gmail.com",
              "gender": "Male",
              "phone": 716009182,
              "present": false
            }
          ]
        },
        {
          "_id": "649c7eeb5655dc0f01b6963d",
          "lesson": "Lesson Two",
          "date": "2023-07-28T08:00:00.627Z",
          "allStudents": 1,
          "presentStudents": 0,
          "absentStudents": 1,
          "students": [
            {
              "_id": "649c79648f38a5a3ea9a2861",
              "firstName": "Kiprotich",
              "lastName": "Shadrack",
              "registationNumber": "stud-0002",
              "email": "kipro@gmail.com",
              "gender": "Male",
              "phone": 716009182,
              "present": false
            }
          ]
        },
        {
          "_id": "649c7ef55655dc0f01b69642",
          "lesson": "Lesson One",
          "date": "2023-07-28T08:00:00.627Z",
          "allStudents": 1,
          "presentStudents": 0,
          "absentStudents": 1,
          "students": [
            {
              "_id": "649c79648f38a5a3ea9a2861",
              "firstName": "Kiprotich",
              "lastName": "Shadrack",
              "registationNumber": "stud-0002",
              "email": "kipro@gmail.com",
              "gender": "Male",
              "phone": 716009182,
              "present": false
            }
          ]
        },
        {
          "_id": "64a5724083ae88c26c22f101",
          "lesson": "Lesson Four",
          "date": "2023-07-28T08:00:00.627Z",
          "allStudents": 1,
          "presentStudents": 0,
          "absentStudents": 1,
          "students": [
            {
              "_id": "649c79648f38a5a3ea9a2861",
              "firstName": "Kiprotich",
              "lastName": "Shadrack",
              "registationNumber": "stud-0002",
              "email": "kipro@gmail.com",
              "gender": "Male",
              "phone": 716009182,
              "present": false
            }
          ]
        }
      ]
      ```

    - **Description**: Returns an array of objects containing attendance details for each lesson in the specified unit. Each object includes the lesson details, the total number of students, the number of students present, the number of students absent, and an array of student objects indicating their attendance status.

  - **Example** (JavaScript `fetch`):

    ```javascript
    const accessToken = "<access-token>";
    const unitId = "649c79f98f38a5a3ea9a2877";

    fetch(`http://localhost:4444/api/filterByUnit/${unitId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });


### Filter Attendance by Date

This API endpoint retrieves the attendance records for a specific date. It provides information about the units taught on that day, including the lessons within each unit and the students who attended each lesson

- **URL**: `/api/filterByDate/:date`
- **Method**: `GET`
- **Headers**:
  - `Authorization: <access-token>` (Required)

- **Query Parameters**:
  - `date` (Required): The date for which to filter the attendance. Format: `YYYYMMDD`.

- **Response**:

  - **Status Code**: `200 OK`
  - **Content**: 
    ```json
      {
      "message": "success",
      "totalUnits": 2,
      "units": [
          {
              "_id": "649c79f38f38a5a3ea9a2873",
              "unitName": "Unit One",
              "totalLessons": 2,
              "lessons": [
                  {
                      "_id": "649c7c77d4441b991aa4d6c3",
                      "lesson": "lesson One",
                      "allStudents": 4,
                      "presentStudents": 2,
                      "absentStudents": 2,
                      "date": "2023-07-28T08:00:00.627Z",
                      "students": [
                          {
                              "_id": "649c79218f38a5a3ea9a285c",
                              "firstName": "hilda",
                              "lastName": "cherotich",
                              "registationNumber": "stud-0001",
                              "email": "hilda@gmail.com",
                              "gender": "Female",
                              "phone": 716009182,
                              "present": true
                          },
                          {
                              "_id": "649c79648f38a5a3ea9a2861",
                              "firstName": "Kiprotich",
                              "lastName": "shadrack",
                              "registationNumber": "stud-0002",
                              "email": "kipro@gmail.com",
                              "gender": "Male",
                              "phone": 716009182,
                              "present": true
                          },
                          {
                              "_id": "649c79768f38a5a3ea9a2866",
                              "firstName": "sururu",
                              "lastName": "alex",
                              "registationNumber": "stud-0003",
                              "email": "sururu@gmail.com",
                              "gender": "Male",
                              "phone": 716009182,
                              "present": false
                          },
                          {
                              "_id": "64a1d4af6de161f0ac7b24a9",
                              "firstName": "shadrack",
                              "lastName": "kiprotich",
                              "registationNumber": "stud-0007",
                              "email": "shadrackr057@gmail.com",
                              "gender": "Male",
                              "phone": 716009182,
                              "present": false
                          }
                      ]
                  },
                  {
                      "_id": "649c7d0e5655dc0f01b695ef",
                      "lesson": "lesson Two",
                      "allStudents": 4,
                      "presentStudents": 2,
                      "absentStudents": 2,
                      "date": "2023-07-28T08:00:00.627Z",
                      "students": [
                          {
                              "_id": "649c79218f38a5a3ea9a285c",
                              "firstName": "hilda",
                              "lastName": "cherotich",
                              "registationNumber": "stud-0001",
                              "email": "hilda@gmail.com",
                              "gender": "Female",
                              "phone": 716009182,
                              "present": true
                          },
                          {
                              "_id": "649c79648f38a5a3ea9a2861",
                              "firstName": "Kiprotich",
                              "lastName": "shadrack",
                              "registationNumber": "stud-0002",
                              "email": "kipro@gmail.com",
                              "gender": "Male",
                              "phone": 716009182,
                              "present": true
                          },
                          {
                              "_id": "649c79768f38a5a3ea9a2866",
                              "firstName": "sururu",
                              "lastName": "alex",
                              "registationNumber": "stud-0003",
                              "email": "sururu@gmail.com",
                              "gender": "Male",
                              "phone": 716009182,
                              "present": false
                          },
                          {
                              "_id": "64a1d4af6de161f0ac7b24a9",
                              "firstName": "shadrack",
                              "lastName": "kiprotich",
                              "registationNumber": "stud-0007",
                              "email": "shadrackr057@gmail.com",
                              "gender": "Male",
                              "phone": 716009182,
                              "present": false
                          }
                      ]
                  }
              ]
          },
          {
              "_id": "649c79f98f38a5a3ea9a2877",
              "unitName": "Unit Two",
              "totalLessons": 2,
              "lessons": [
                  {
                      "_id": "649c7d765655dc0f01b695f9",
                      "lesson": "lesson One",
                      "allStudents": 2,
                      "presentStudents": 2,
                      "absentStudents": 0,
                      "date": "2023-07-28T08:00:00.627Z",
                      "students": [
                          {
                              "_id": "649c79218f38a5a3ea9a285c",
                              "firstName": "hilda",
                              "lastName": "cherotich",
                              "registationNumber": "stud-0001",
                              "email": "hilda@gmail.com",
                              "gender": "Female",
                              "phone": 716009182,
                              "present": true
                          },
                          {
                              "_id": "649c79648f38a5a3ea9a2861",
                              "firstName": "Kiprotich",
                              "lastName": "shadrack",
                              "registationNumber": "stud-0002",
                              "email": "kipro@gmail.com",
                              "gender": "Male",
                              "phone": 716009182,
                              "present": true
                          }
                      ]
                  },
                  {
                      "_id": "649c7d825655dc0f01b69601",
                      "lesson": "lesson Two",
                      "allStudents": 2,
                      "presentStudents": 2,
                      "absentStudents": 0,
                      "date": "2023-07-28T08:00:00.627Z",
                      "students": [
                          {
                              "_id": "649c79218f38a5a3ea9a285c",
                              "firstName": "hilda",
                              "lastName": "cherotich",
                              "registationNumber": "stud-0001",
                              "email": "hilda@gmail.com",
                              "gender": "Female",
                              "phone": 716009182,
                              "present": true
                          },
                          {
                              "_id": "649c79648f38a5a3ea9a2861",
                              "firstName": "Kiprotich",
                              "lastName": "shadrack",
                              "registationNumber": "stud-0002",
                              "email": "kipro@gmail.com",
                              "gender": "Male",
                              "phone": 716009182,
                              "present": true
                          }
                      ]
                  }
              ]
          }
      ]
      }
    ```
    - **Description**: Returns an array of units object, and in each unit object is an array of lessons for the unit thought on that day with respective array of students who attended each lesson

  - **Example** (JavaScript `fetch`):

    ```javascript
    const accessToken = "<access-token>";
    const date = "20230705";

    fetch(`http://localhost:4444/api/filterByDate/${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    ```