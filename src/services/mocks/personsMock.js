async function getAllPersons() {
    return new Promise(resolve => resolve(data));
}

export default {
    getAllPersons: getAllPersons
}

var data = [
  {
    "personId": 0,
    "firstName": "Mays",
    "lastName": "Snider",
    "company": "Google"
  },
  {
    "personId": 1,
    "firstName": "Oneal",
    "lastName": "Giles",
    "company": "SpaceX"
  },
  {
    "personId": 2,
    "firstName": "Gabriela",
    "lastName": "Willis",
    "company": "Uber"
  },
  {
    "personId": 3,
    "firstName": "Hatfield",
    "lastName": "Graham",
    "company": "SpaceX"
  },
  {
    "personId": 4,
    "firstName": "Tara",
    "lastName": "Ortiz",
    "company": "Microsoft"
  },
  {
    "personId": 5,
    "firstName": "Kidd",
    "lastName": "Walls",
    "company": "SpaceX"
  },
  {
    "personId": 6,
    "firstName": "Rhoda",
    "lastName": "Bradford",
    "company": "Google"
  },
  {
    "personId": 7,
    "firstName": "Bray",
    "lastName": "Carpenter",
    "company": "SpaceX"
  },
  {
    "personId": 8,
    "firstName": "Concepcion",
    "lastName": "Kline",
    "company": "Google"
  },
  {
    "personId": 9,
    "firstName": "Barrett",
    "lastName": "Anthony",
    "company": "SpaceX"
  }
];