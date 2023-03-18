/* This file was created for functions that can be reused in other modules providing abstraction and modularity*/
import mongoose from 'mongoose';
import { DEFAULT_PAGE, DEFAULT_LIMIT, DEFAULT_SEARCH, DB_URI } from './default.js';
//imported flatfile of type json to process requests
import acronymArr from './acrons.json' assert {type: 'json'}
import { Acronym } from '../model/model.js';


//simple database connection setup
//set the db to on and connect only once
const dbConnection = async () => {
    try {
        await mongoose.connect(DB_URI);
        const db = mongoose.connection;

        db.on('error', (error) => {console.log(error)});

        db.once('connected', () => {console.log('connected and ready')})
    } catch (error) {
        console.error(`The connection to DB could not be established: ${error}`);
    } 
}

//match search and return array using "includes" to match acronyms
//from the passed "search" paramater;
//npms such as fuse.js can also be used to fuzzy match "search";
//const acronymArr = await Acronym.find({}); this can be used to acquire data from the db to process this request 
//but I have made use of the flat file here
const searchAcronyms = (search = DEFAULT_SEARCH) => acronymArr.filter(item => item.acronym.includes(search));

//paginates processed array as per the passed parameters
const paginateAndProcessAcronyms = async (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, search = DEFAULT_SEARCH) => {
    //since an "undefined" value automatically takes the default value, an extra setup needed to be
    //followed for checking other falsy values (0, null, empty string) to assign default if present
    page = parseInt(page) || DEFAULT_PAGE;
    limit = parseInt(limit) || DEFAULT_LIMIT;
    search = search || DEFAULT_SEARCH;

    const processedAcronymArray = searchAcronyms(search);
    const initialIndex = (page - 1) * limit;
    //last index is either the calculated value of the index of the said page number
    //or it is the last index of the array itself, because calculated value can't be greater than the length of the array
    const terminalIndex = Math.min(initialIndex + limit, processedAcronymArray.length);

    //slice instead of splice for the specified page number display of items
    const paginatedData = processedAcronymArray.slice(initialIndex, terminalIndex);

    //caluclating if there is more data to display to set the header
    const header = page < Math.ceil(processedAcronymArray.length / limit);

    //if array's length is 0, which means it is false, which means "there is no data to display"
    //if array's length is > 0, then directly send the paginated data;
    //return 'header' value along with procssed and paginated data
    return {
        data: paginatedData.length ? paginatedData : [`There is nothing to display on this ${page}!`],
        header,
    };
}

//insert entry from post request into pre-existing file
const addAcronymEntry = async (acronym, definition) => {
    acronym = acronym.toUpperCase();
    //cleaner way to define properties with the same names as the variables
    const acronymEntryToAdd = { acronym, definition };
    //create a new document to be saved as per the Acronym schema
    const acron = new Acronym(acronymEntryToAdd);
    //use save or InsertOne method by mongodb to insert data
    const acronymAdded = await acron.save();
    return acronymAdded;
}

//update entry from patch request from pre-existing entry
const updateAcronymEntry = async (acronymId, acronym, definition) => {
    //as per standard observed in the data provided, acronyms are all uppercase
    acronym = acronym.toUpperCase();
    //create an object that is to be updated, replacing the old acronym and definition
    const acronymEntryToUpdate = { acronym, definition };
    //pass the id to find the entry that needs to be patched and the data that it needs to be replaced with
    //new option is to be set to true to show new data after update and not the old one
    const acronymUpdated = await Acronym.findByIdAndUpdate(acronymId, acronymEntryToUpdate, {new: true})
    //send error message if the variable is empty after the operation
    return acronymUpdated ? acronymUpdated : 'No data found';
}

//delete request for specific Id
const deleteAcronymEntry = async (acronymId) => {
    //pass the id that needs to be used to find the entry that is to be deleted
    const acronymDeleted = await Acronym.findByIdAndDelete(acronymId);
    //if no entry was deleted, pass error message
    return acronymDeleted ? acronymDeleted : `Entry with ${acronymId} could not be found`;
}

export { dbConnection, paginateAndProcessAcronyms, addAcronymEntry, updateAcronymEntry, deleteAcronymEntry };
