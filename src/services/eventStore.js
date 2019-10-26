import axios from 'axios';
import personsMock from './mocks/personsMock';
import eventsMock from './mocks/eventsMock';

async function getAllPersons() {
    return await personsMock.getAllPersons();
}

async function getPerson(personId) {
    return await personsMock.getPerson(personId);
}

async function getLatestEvents(top, skip = 0) {
    return await eventsMock.getLatestEvents(top, skip);
}

export default {
    getAllPersons: getAllPersons,
    getPerson: getPerson,
    getLatestEvents: getLatestEvents
}