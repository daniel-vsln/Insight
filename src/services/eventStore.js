import axios from 'axios';

class EventStore {
    constructor() {
        this.url = 'http://172.26.3.99:5000/api/';
    }

    async getAllPersons() {
        try {
            const response = await axios.get(this.url + 'person/getpersons');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getEvents(page, perpage, persons, query) {
        const params = { pageNumber: page, perPage: perpage };

        if (persons.length) {
            params.personIds = persons;
        }

        if (query) {
            params.keyPhrase = query;
        }

        try {
            const response = await axios.get(this.url + 'event/getevents' + this.parseParams(params));
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addPersons(persons) {
        try {
            const response = await axios.post(this.url + 'person/addpersons', persons);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    parseParams(params) {
        const keys = Object.keys(params);

        if (keys.length) {
            return '?' + keys.reduce((acc, key) => {
                if (Array.isArray(params[key])) {
                    params[key].forEach(param => {
                        acc.push(`${key}=${param}`);
                    })
                } else {
                    acc.push(`${key}=${params[key]}`);
                }

                return acc;
            }, []).join('&');
        } else {
            return '';
        }
    }
};

export default EventStore;
