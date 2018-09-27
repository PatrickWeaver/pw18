import * as settings from '../../settings'
import * as axios from 'axios'

async function getData(path, apiKey) {
  var apiKeyQuery = ''
  apiKey = localStorage.getItem('pw18-api-key')
  if (apiKey) {
    apiKeyQuery = 'api_key=' + apiKey + '&'
  }
  var qs = '?' + apiKeyQuery + 'quantity=10'
  var response = await(axios.get(settings.API_URL + path + qs))
  return response.data
}

async function sendData(data, path) {
  var apiKey = localStorage.getItem('pw18-api-key')
  var body = Object.assign({api_key: apiKey}, data);
  var response = await(axios.post(settings.API_URL + path, body))
  return response.data
}

async function sendFile(file, path) {
  var formData = new FormData();
  formData.append('api_key', '');
  formData.append('file', file);

  var options = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  var response = await(axios.post(settings.API_URL + path, formData, options))
  return response.data
}

export default {
  getData: getData,
  sendData: sendData,
  sendFile: sendFile
}