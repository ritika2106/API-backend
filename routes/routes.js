import express, { response } from 'express';
import acronymArr from '../util/acrons.json' assert {type: 'json'}
import { Acronym } from '../model/model.js';
import { dbConnection, paginateAndProcessAcronyms } from '../util/reusable.js';

const app = express();

app.get('/', async (req, res) => {
    try {
        const processedArray = await paginateAndProcessAcronyms(req.query.page, req.query.limit, req.query.search)
        res.set({ 'More-Data': processedArray.header })
        res.send(processedArray.data);
    }
    catch (error) {
        console.log('Could not complete GET request, please try again: ', error);
    }
})

app.post('/', async (req, res) => {
    const acron = new Acronym({ acronym: "W8", definition: "Wait" })
    try {
        await acron.save();
        res.send(acron);
    } catch (e) {
        console.log("Could not save the document: ", e);
    }
})


export { app };