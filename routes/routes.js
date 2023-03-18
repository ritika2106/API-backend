import express from 'express';
import { paginateAndProcessAcronyms, addAcronymEntry, updateAcronymEntry, deleteAcronymEntry } from '../util/reusable.js';

const app = express();

//get request at /acronym
app.get('/', async (req, res) => {
    try {
        const processedArray = await paginateAndProcessAcronyms(req.query.page, req.query.limit, req.query.search)
        //set header before passing processed data
        res.set({ 'More-Data': processedArray.header })
        res.send(processedArray.data);
    }
    catch (error) {
        console.log('Could not complete GET request, please try again: ', error);
    }
})

//post request at /acronym
app.post('/', async (req, res) => {
    try {
        const addedAcronym = await addAcronymEntry(req.body.acronym, req.body.definition);
        res.send(addedAcronym);
    } catch (error) {
        console.log("Could not POST request, please try again: ", error);
    }
})

//patch request for specific acronym Id
app.patch('/:acronymID', async(req, res) => {
    try{
        if(req.params && req.params.acronymID){
            const patchedEntry = await updateAcronymEntry(req.params.acronymID, req.body.acronym, req.body.definition);
            res.send(patchedEntry);
        }
    }catch(error){
        console.log("Could not PATCH request, please try again: ", error);
    }
})

//delete request for specific acronym id
app.delete('/:acronymID', async(req, res) => {
    try{
        if(req.params && req.params.acronymID){
            const deletedEntry = await deleteAcronymEntry(req.params.acronymID); 
            res.send(deletedEntry);
        }
    }catch(error){
        console.log("Could not complete DELETE request, please try again: ", error);
    }
})

export { app };