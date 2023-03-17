import express from 'express';

import { dbConnection, paginateAndProcessAcronyms } from './util/reusable.js'

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => res.send('Test GET request is working'));

app.get('/acronym', async (req, res) => {
    try {
        const processedArray = await paginateAndProcessAcronyms(req.query.page, req.query.limit, req.query.search)
        res.set({"More-Data": processedArray.header})
        res.send(processedArray.data);
    }
    catch (e) {
        console.log("Error caught: ", e);
    }
})

app.post('/acronym', async(req, res) => {
    await dbConnection();
    if(req.body && req.body.acronym && req.body.definition){
        console.log("inside if")
    }
})

app.listen(PORT, () => console.log('Backend is now listening for requests'));
