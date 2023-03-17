import express from 'express';
import * as routes from './routes/routes.js'
import { dbConnection } from './util/reusable.js'

const app = express();

app.use(express.json());

app.use('/acronym', routes.app);

const PORT = process.env.PORT || 3000;

await dbConnection();

app.listen(PORT, () => console.log('Backend is now listening for requests'));

