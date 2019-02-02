import * as settings from '../../settings'
import * as axios from 'axios'

const version = 'v1'

function key() {
  return localStorage.getItem('pw18-api-key')
}

async function getIndexPageList(apiCategory, apiObject, apiListName, apiTotalName, perPage, currentPage, admin) {
  var apiData = await(getIndex(apiCategory, apiObject, admin))
  const fullList = apiData[apiListName]
  const total = apiData[apiTotalName]
  return paginateIndex(fullList, total, perPage, currentPage);
}

function paginateIndex(list, total, perPage, currentPage) {
  var pages = Math.ceil(total/perPage)
  var pageStart = (currentPage - 1) * perPage
  var pageEnd = pageStart + perPage
  return {
    pageList: list.slice(pageStart, pageEnd),
    pages: pages
  }
}

// sets up delete request for API
async function deleteObject(section, object, slug) {
  var path = '/' + version + '/' + section + '/'
  if (object) {
    path += object + '/'
  }
  path += slug + '/delete/';
  var response = await(sendData({}, path))
  if (response.success) {
    this.$router.push({ path: '/' + section })
    return true;
  } else {
    console.log("ERROR:", response.error);
    return false;
  }
}

async function getIndex(section, object = false, admin = false) {
    var path = '/' + version + '/' + section + '/'
    if (object) {
      path += object + '/'
    }
    var qs = {
      quantity: 'all'
    }
    var apiData = await(getData(path, qs, admin))
    return apiData
}

async function getTags(admin = false, status = null) {
  var path = '/' + version + '/portfolio/tags/'
  var qs = {
    quantity: 'all'
  }
  if ( !(status === null) ) {
   qs['status'] = status
  }
  var api_data = await(getData(path, qs, admin))
  return api_data.tags_list
}

// Sounds outgoing API request
async function sendData(data, path) {
  var apiKey = key()
  var body = Object.assign({api_key: apiKey}, data);
  console.log("PATH:", path);
  console.log("DATA:", data);
  try {
    var response = await axios.post(settings.API_URL + path, body)
  } catch(err) {
    return {
      error: err
    }
  }
  return response.data
}


// Sends outgoing file request to API (upload)
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

// Sends incomming API request
async function getData(path, queries={}, admin=false) {
  var apiKey = 'false'
  if (admin) {
    apiKey = key()
  }
  var qs = '?api_key=' + apiKey
  for (var i in queries) {
    qs += '&' + i + '=' + queries[i]
  }
  var response = await(axios.get(settings.API_URL + path + qs))
  return response.data
}

export default {
  deleteObject: deleteObject,
  getIndexList: getIndexPageList,
  paginateIndex: paginateIndex,
  getData: getData,
  getIndex: getIndex,
  getTags: getTags,
  sendData: sendData,
  sendFile: sendFile
}