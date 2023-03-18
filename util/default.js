//file that includes all default values 
//this prevents unnecessary code breaking in falsy scenarios;
//separate file also makes it very easy and accessible to 
//add/remove/update any values

const DEFAULT_LIMIT = 10,
    DEFAULT_PAGE = 1,
    DEFAULT_SEARCH = '';
    DB_URI = 'mongodb+srv://ritika-k:ritika21@fulhaus-cluster.hqtvchd.mongodb.net/acronym';

export { DEFAULT_PAGE, DEFAULT_LIMIT, DEFAULT_SEARCH, DB_URI }; 