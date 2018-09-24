import * as settings from '../../settings';
import * as rp from 'request-promise-native';

async function getData(path) {
  return JSON.parse(await(rp(settings.API_URL + path + '?quantity=10')))
}

async function sendData(data, path) {
  
  var options = {
    method: 'POST',
    uri: settings.API_URL + path,
    body: Object.assign({api_key: settings.API_KEY}, data),
    json: true
  };
  return await(rp(options))
}

export default {
  getData: getData,
  sendData: sendData
}