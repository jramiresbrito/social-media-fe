import http from './httpService';

const apiEndpoint = '/people';

function peopleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPerson(id) {
  return http.get(peopleUrl(id));
}

export function getPeople() {
  return http.get(apiEndpoint);
}

export function deletePeople(id) {
  return http.delete(peopleUrl(id));
}

export function savePeople(person) {
  if (person._id) {
    const body = {...person};
    delete body._id;
    return http.put(peopleUrl(person._id), body);
  }
  return http.post(apiEndpoint, person);
}
