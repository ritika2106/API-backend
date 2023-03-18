# Rest API for CRUD operation using Node, Express and Mongoose

To run the application:
1. Add database url in default.js
2. If using local database, make sure mongoclient is running
3. To start the server type "node index.js"; this should start the server on port 3000
4. Use postman or curl to check the response for each request
5. The assignment includes the following HTTP requests:

GET - /acronym

POST - /acronym (make sure to pass the acronym and definition in body)

PATCH - /acronym/:acronymID (make sure to pass the acronym and definition in body)

DELETE - /acronym/:acronymID
