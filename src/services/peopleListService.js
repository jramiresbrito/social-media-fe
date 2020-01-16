import http from './httpService';

const apiEndpoint = '/people-list';

function listUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getList() {
  return http.get(apiEndpoint);
}

export function saveList(list) {
  if (list._id) {
    const body = {...list};
    delete body._id;
    return http.put(listUrl(list._id), body);
  }
  return http.post(apiEndpoint, list);
}
