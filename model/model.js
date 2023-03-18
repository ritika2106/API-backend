/*This file shows the shcema used to add documents to the database */
import mongoose from 'mongoose';

const acronSchema = new mongoose.Schema({
    acronym: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true
    }
});

const Acronym = mongoose.model('Acronym', acronSchema);
export { Acronym };

