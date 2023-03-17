import mongoose from 'mongoose';
import { DEFAULT_PAGE, DEFAULT_LIMIT, DEFAULT_SEARCH } from './default.js';
import acronymArr from './acrons.json' assert {type: 'json'}

//open a database connection
const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://ritika-k:ritika21@fulhaus-cluster.hqtvchd.mongodb.net/acronym');
        const db = mongoose.connection;

        db.on('error', (error) => {console.log(error)});

        db.once('connected', () => {console.log('connected and ready')})
    } catch (error) {
        console.error(`The connection to DB could not be established: ${error}`);
    } 
}

//match search and return array
const searchAcronyms = (search = DEFAULT_SEARCH) => acronymArr.filter(item => item.acronym.includes(search));

//automatically assumes default value for undefined not for null/0/empty
const paginateAndProcessAcronyms = async (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, search = DEFAULT_SEARCH) => {
    //cehcking falsy values (0, null, empty string), assigns default value if they are any of these values
    page = parseInt(page) || DEFAULT_PAGE;
    limit = parseInt(limit) || DEFAULT_LIMIT;
    search = search || DEFAULT_SEARCH;

    const processedAcronymArray = searchAcronyms(search);
    const initialIndex = (page - 1) * limit;
    //last index is either the calculated value of the index of the said page number
    //or it is the last index of the array itself, because calculated value can't be greater than the length of tyhe array
    const terminalIndex = Math.min(initialIndex + limit, processedAcronymArray.length);

    //slice instead of splice for the specified page number display of items
    const paginatedData = processedAcronymArray.slice(initialIndex, terminalIndex);

    //caluclating if there is more data to display to set the header
    const header = page < Math.ceil(processedAcronymArray.length / limit);

    //if array's length is 0, which means it is false, which means "there is no data to display"
    //if array's length is > 0, then directly send the paginated data
    return {
        data: paginatedData.length ? paginatedData : ['There is nothing to display on this page!'],
        header,
    };
}

//insert entry from post request into pre-existing file
const addAcronymEntry = async (acronym, definition) => {
    await dbConnection();

    

}

export { dbConnection, paginateAndProcessAcronyms };
