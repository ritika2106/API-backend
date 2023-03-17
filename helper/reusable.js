import { DEFAULT_PAGE, DEFAULT_LIMIT, DEFAULT_SEARCH } from '../util/default.js';
import acronymArr from '../util/acrons.json' assert {type: 'json'}

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
    const terminalIndex = Math.min(initialIndex + limit, processedAcronymArray.length);

    const paginatedData = processedAcronymArray.slice(initialIndex, terminalIndex);
    const setHeader = checkForMoreData(page, paginatedData.length, limit);
    console.log(typeof setHeader, "inside processing func");
    //the check is here is specifically for the processed array length being less than the calculated inital index for the requested page
    //the initial index check could very well be replaced with ===0 but this could be misleading incase the procssed array is empty
    //because of any other reason. an empty array would indicated that there is an error instead of displaying a message that is not an "error"
    //message
    return (paginatedData.length < initialIndex) ? 'There is nothing to display on this page!' : paginatedData;

}

const checkForMoreData = async (page, arrayLen, limit) => {
    if (arrayLen > 0) {
        console.log("inside if length > 0")
        if (page > Math.ceil(arrayLen / limit)) {
            console.log("internal ")
            return { 'headerToBeSet': true }
        }
    } 
    console.log("else is true")
    return { 'headerToBeSet': false }
}

export { paginateAndProcessAcronyms };
