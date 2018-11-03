import * as settings from '../../settings'
import * as axios from 'axios'

async function getData(path, queries={}, admin=false,) {
  var apiKey = 'false'
  if (admin) {
    apiKey = localStorage.getItem('pw18-api-key')
  }
  var qs = '?api_key=' + apiKey
  for (var i in queries) {
    qs += '&' + i + '=' + queries[i]
  }
  var response = await(axios.get(settings.API_URL + path + qs))
  return response.data
}

async function getIndex(section, object, admin = false) {
    var path = '/v1/' + section + '/' + object + '/'
    var qs = {
      quantity: 'all'
    }
    var apiData = await(getData(path, qs))
    return apiData
}

async function getTags(admin = false, status = null) {
  var path = '/v1/portfolio/tags/'
  var qs = {
    quantity: 'all'
  }
  if ( !(status === null) ) {
   qs['status'] = status
  }
  var api_data = await(getData(path, qs, admin))
  return api_data.tags_list
}

async function sendData(data, path) {
  var apiKey = localStorage.getItem('pw18-api-key')
  var body = Object.assign({api_key: apiKey}, data);
  var response = await(axios.post(settings.API_URL + path, body))
  return response.data
}

async function sendFile(file, path) {
  var formData = new FormData();
  formData.append('api_key', localStorage.getItem('pw18-api-key'));
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
  getIndex: getIndex,
  getTags: getTags,
  sendData: sendData,
  sendFile: sendFile
}