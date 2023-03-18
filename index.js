import express from 'express';
import * as routes from './routes/routes.js'
import { dbConnection } from './util/reusable.js'

const app = express();

app.use(express.json());

//added routes.app as the middleware function, it is being mount to /acronym 
//any api that macthes this path will be sent to routes.app for processing
app.use('/acronym', routes.app);

const PORT = process.env.PORT || 3000;

//create a db connection before any API calls are made
await dbConnection();

//listening at port 3000 by default if port not provided in env file
app.listen(PORT, () => console.log('Backend is now listening for requests'));

