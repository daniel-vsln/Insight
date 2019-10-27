import axios from 'axios';
import personsMock from './mocks/personsMock';
import eventsMock from './mocks/eventsMock';

class EventStore {
    constructor() {
        this.url = 'http://172.26.3.99:5000/api/';
    }

    async getAllPersons() {
        return await personsMock.getAllPersons();
    }

    async getPerson(personId) {
        return await personsMock.getPerson(personId);
    }

    async getLatestEvents(top, skip = 0) {
        try {
            const response = await axios.get(this.url + 'event/1'); // TODO remove 1, just for test
            return [response];
        } catch (error) {
            console.error(error);
        } 
        // return await eventsMock.getLatestEvents(top, skip);
    }

    async addPersons(persons) {
        try {
            const response = await axios.post(this.url + 'persons', persons);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
};

export default EventStore;