import http from './httpService';

const apiEndpoint = '/network';

function networkUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getNetworks() {
  return http.get(apiEndpoint);
}

export function deleteNetwork(id) {
  return http.delete(networkUrl(id));
}

export function saveNetwork(network) {
  if (network._id) {
    const body = {...network};
    delete body._id;
    return http.put(networkUrl(network._id), body);
  }
  return http.post(apiEndpoint, network);
}
