import http from './httpService';

const apiEndpoint = '/post';

export function getPosts() {
  return http.get(apiEndpoint);
}

export function savePost(post) {
  return http.post(apiEndpoint, post)
}
