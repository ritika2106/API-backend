# Rest API for CRUD operation using Node, Express and Mongoose

To run the application:
1. Clone the code locally
2. Add database url in default.js
3. If using local database, make sure mongoclient is running
4. To start the server type "node index.js"; this should start the server on port 3000
5. Use postman or curl to check the response for each request
6. The assignment includes the following HTTP requests:

GET - /acronym

POST - /acronym (make sure to pass the acronym and definition in body)

PATCH - /acronym/:acronymID (make sure to pass the acronym and definition in body)

DELETE - /acronym/:acronymID
