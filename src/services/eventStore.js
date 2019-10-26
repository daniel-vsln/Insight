import axios from 'axios';
import mock from './mock'

async function getAllPersons() {
    return await mock.getAllPersons();
}

async function getPerson(personId) {
    return await mock.getPerson(personId);
}

export default {
    getAllPersons: getAllPersons,
    getPerson: getPerson
}