CRUD API – Name Server
A simple CRUD API built using Node.js, Express, and MongoDB (Mongoose). This API allows adding names to a database, searching for names, and viewing all saved names.

Features
Insert names into MongoDB

Search names using query parameters or route parameters

Fetch all saved names

Simple HTML form for user input

Error handling for database operations

Tech Stack
Node.js

Express.js

MongoDB with Mongoose

Body-Parser

Project Structure
php
Copy
Edit
crud-api/
│── public/             # HTML form for name submission
│── server.js           # Main server file
│── package.json        # Project dependencies and scripts
Installation & Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/crud-api.git
Navigate to the folder:

bash
Copy
Edit
cd crud-api
Install dependencies:

bash
Copy
Edit
npm install
Start MongoDB on your local machine (default port 27017).

Run the server:

bash
Copy
Edit
npm start
Visit:

arduino
Copy
Edit
http://localhost:3000
API Endpoints (Documentation)
POST /nextpage
Inserts a new name into the database

Request body:

json
Copy
Edit
{ "name": "John" }
Response: HTML message confirming the name was saved

GET /search?name=John
Searches for a name using query parameter

Response: "Name found!" or "Name not found!"

GET /search/:name
Searches for a name using route parameter

Response: "Name found using route param!" or "Name NOT found using route param!"

GET /allnames
Returns all names stored in the database

Notes
MongoDB must be running locally on mongodb://127.0.0.1:27017/namesDB.

Make sure to have MongoDB installed.
