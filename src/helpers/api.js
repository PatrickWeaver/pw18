import * as settings from '../../settings';
import * as rp from 'request-promise-native';

async function getData(path, apiKey) {
  var apiKeyQuery = ''
  apiKey = localStorage.getItem('pw18-api-key')
  if (apiKey) {
    apiKeyQuery = 'api_key=' + apiKey + '&'
  }
  var qs = '?' + apiKeyQuery + 'quantity=10'
  return JSON.parse(await(rp(settings.API_URL + path + qs)))
}

async function sendData(data, path) {
  var apiKey = localStorage.getItem('pw18-api-key')
  var options = {
    method: 'POST',
    uri: settings.API_URL + path,
    body: Object.assign({api_key: apiKey}, data),
    json: true
  };
  return await(rp(options))
}

export default {
  getData: getData,
  sendData: sendData
}