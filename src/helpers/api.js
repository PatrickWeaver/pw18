import * as settings from '../../settings';
import * as rp from 'request-promise-native';

async function getData(path) {
  return JSON.parse(await(rp(settings.API_URL + path + '?quantity=10')))
}

export default {
  getData: getData 
}