import express from 'express';

import { paginateAndProcessAcronyms } from './helper/reusable.js'

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => res.send('Test GET request is working'));

app.get('/acronym', async (req, res) => {
    try {
        const arr = await paginateAndProcessAcronyms(req.query.page, req.query.limit, req.query.search)
        console.log(JSON.parse(arr))
    }
    catch (e) {
        console.log("Error caught: ", e);
    }
})

app.listen(PORT, () => console.log('Backend is now listening for requests'));

